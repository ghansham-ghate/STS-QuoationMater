export const generatePdf=function(itemData,quotation,customer_name,customer_address,item_owner){
    let data=[];
    
    for(let i=0;i<itemData.length;i++)
    {
        let item=[];
        item.push(i+1);
        item.push(itemData[i].itemName+"("+itemData[i].nvcharItem_description+")");
        item.push(itemData[i].itemQuantity);
        item.push(itemData[i].itemPrice);
        item.push(itemData[i].itemDiscount);
        item.push(itemData[i].netAmount.toFixed(2));
        data.push(item);
    } 
    var doc = new jsPDF('p','mm','a4');
    
    let margins={
        top:5,
        left:15,
        right:5,
        bottom:5,
    }
    let arrayLength=18;
    let pageWidth = doc.internal.pageSize.getWidth();
    let pageHeight = doc.internal.pageSize.getHeight();
    let receiverName=customer_name;
    let address=customer_address;
    let messageAboveTable="We thank you for you above referred enquiry and take pleasure in quoting as under."
    let quotaionDetails={number:quotation.nvcharQuotation_no,date:quotation.dtQuoDate};
    let contactDetails={
        phone:quotation.NvcharDescription.split(',')[0],
        emailId:quotation.NvcharDescription.split(',')[2],
        contactName:quotation.NvcharDescription.split(',')[1],
        enquiryDate:quotation.dtEnqDate.substring(0,11),}
    let canvas={x:0,y:0,};
    
        doc.setFontSize(10);
        /// to part
        addHeader();
        ///  adding dear sir message
        canvas.y=canvas.y+10;
        doc.setFontStyle('bold');
        doc.text('Dear Sir/Madam,',margins.left,canvas.y);
        doc.setFontStyle('normal');
        canvas.y=canvas.y+5;
        doc.text(messageAboveTable,margins.left+5,canvas.y);
        canvas.y=canvas.y+5;
        if(data.length>arrayLength)
        {
            getnerateAutoTable(0,arrayLength);
        }
        else
        {
            getnerateAutoTable(0,data.length); 
        }
        if(data.length>arrayLength)
        {
            let numberOfPages=data.length/arrayLength;
            let K1=1;
            console.log(numberOfPages);
            for(let k=0;k<Math.floor(numberOfPages);k++)
            {
                doc.addPage('a4','p');
                addHeader();
                //console.log("insideLoop",(K1*16),((K1*16)+16),data.length-(K1*16))
                if(data.length-(K1*arrayLength)<arrayLength)
                {
                    getnerateAutoTable(K1*arrayLength,data.length);
                }
                else
                {
                    getnerateAutoTable(K1*arrayLength,((K1*arrayLength)+arrayLength));   
                }
                K1=K1+1;
            } 
            
        }
        else
        {
            
        }
        addFooterPart1(quotation.NvcharTermsandCond.split(','));
        addFooterPart2(item_owner,"Director");
        doc.save(quotation.nvcharQuotation_no+'.pdf');
    
    function getnerateAutoTable(startIndex,endIndex)
    {
        canvas.y=canvas.y+5;
        let autoTableData=[];
        for(let i=startIndex;i<endIndex;i++)
        {
            autoTableData.push(data[i]);
            
        }
        if(arrayLength-(endIndex-startIndex)>0)
        {
            let indexValue=arrayLength-(endIndex-startIndex);
            for(let i=0;i<indexValue;i++)
            {
                autoTableData.push([" "," "," "," "," "," "]);
                
            }  
            
            autoTableData.push([{ content: "BLANK DESIGN TO WILL BE IS    TOTAL : "+quotation.decTotal_amount, colSpan: 6, rowSpan: 1, styles: { halign: 'center' } }]);
        }
        else if(endIndex==data.length)
        {
            autoTableData.push([{ content: "BLANK DESIGN TO WILL BE IS    TOTAL : "+quotation.decTotal_amount, colSpan: 6, rowSpan: 1, styles: { halign: 'center' } }]);
       
        }
        console.log(autoTableData);
        doc.autoTable({
        head: [['Sr No.', 'Item Description', 'Qty.','Each Price','Discount','Total Price']],
        body: autoTableData,
        startY:canvas.y,
        theme:'grid',
        });  
    }
    function addHeader()
    {
        let imageData="data:image/png;base64,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";
        canvas.y=0;
        canvas.y=canvas.y+10;
        doc.text('To', margins.left,canvas.y);
        doc.addImage(imageData,'PNG',pageWidth-80,canvas.y,80,20);
        canvas.y=canvas.y+5;
        doc.text(receiverName, margins.left,canvas.y);
        canvas.y=canvas.y+5;
        doc.text(address, margins.left,canvas.y,{maxWidth:50});
        // adding logo

        ///// contact details, quotaion number and date on right side
        canvas.y=canvas.y+15;
        doc.text('Phone : '+contactDetails.phone,margins.left,canvas.y);
        doc.text('Quotation No. : '+quotaionDetails.number,pageWidth-50,canvas.y);
        canvas.y=canvas.y+5;
        doc.text('Email Id : '+contactDetails.emailId,margins.left,canvas.y);
        doc.text('Date : '+quotaionDetails.date,pageWidth-50,canvas.y);
        canvas.y=canvas.y+5;
        doc.text('Contact Name: '+contactDetails.contactName,margins.left,canvas.y);
        canvas.y=canvas.y+5;
        doc.text('Enquiry Date: '+contactDetails.enquiryDate,margins.left,canvas.y);
    }
    function addFooterPart1(conditions)
    {
       let FooterStart=pageHeight-50;
       doc.text('TERMS AND CONDITIONS',margins.left,FooterStart);
       FooterStart=FooterStart+10;
       for(let i=0;i<conditions.length;i++)
       {
        doc.text(conditions[i],margins.left,FooterStart);
        FooterStart=FooterStart+5;
       }     
    }
    function addFooterPart2(name,authority)
    {
       let FooterStart=pageHeight-50;
       doc.text('Thank you and awaiting your valuable order',pageWidth-75,FooterStart);
       FooterStart=FooterStart+5;
       doc.text('Yours Faithfully ',pageWidth-50,FooterStart);
       FooterStart=FooterStart+5;
       doc.setFontStyle('bold');
       doc.text('For SIZE CONTROL GAUGES & TOOLS PVT LTD',pageWidth-85,FooterStart);
       doc.setFontStyle('normal');
       FooterStart=FooterStart+10;
       doc.text(name,pageWidth-50,FooterStart);
       FooterStart=FooterStart+5;
       doc.text(authority,pageWidth-50,FooterStart);
    }
}