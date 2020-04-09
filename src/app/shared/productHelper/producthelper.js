export const submitDetailsCall= function (productDetailpricing,columns,rows,outerCount,rowOuterCount)
{
  

  let alldata=[];
  let lastIndex=0;
  for(let i=0;i<columns.length;i++)
  {
    let id="0"+i;
    let el=document.getElementById(id).getAttribute('cell-value');
    if(el!="NA")
    {
      outerCount=i;
    }
  }
  for(let i=0;i<rows.length;i++)
  {
    let id=i+"0";
    let el=document.getElementById(id).getAttribute('cell-value');
    if(el!="NA")
    {
      rowOuterCount=i;
    }
  }
  console.log(rowOuterCount+" "+outerCount);
  for( let i=0;i<=rowOuterCount;i++){
    let innerArray=[];
  for( let j=0;j<=outerCount;j++){
    let id =i+""+j;
    let value=document.getElementById(id).getAttribute('cell-value');
    innerArray.push(value);
  }
  alldata.push(innerArray);
}
console.log( JSON.stringify(alldata));
let productDetail={
  details:JSON.stringify(alldata),
}
productDetailpricing=productDetail;
console.log(productDetailpricing);
 
  // const val=this.productclass.saveProduct(productDetail);
  // if(val)
  // {
  //   this.clearAllCell();
  // }
 return JSON.stringify(alldata);
//  this.submitdata();
}
export const updateSubmitDetailsCall= function (productDetailpricing,columns,rows,outerCount,rowOuterCount)
{
  

  let alldata=[];
  let lastIndex=0;
  for(let i=0;i<columns.length;i++)
  {
    let id="0"+i+"l";
    let el=document.getElementById(id).getAttribute('cell-value');
    if(el!="NA")
    {
      outerCount=i;
    }
  }
  for(let i=0;i<rows.length;i++)
  {
    let id=i+"0"+"l";
    let el=document.getElementById(id).getAttribute('cell-value');
    if(el!="NA")
    {
      rowOuterCount=i;
    }
  }
  console.log(rowOuterCount+" "+outerCount);
  for( let i=0;i<=rowOuterCount;i++){
    let innerArray=[];
  for( let j=0;j<=outerCount;j++){
    let id =i+""+j+"l";
    let value=document.getElementById(id).getAttribute('cell-value');
    innerArray.push(value);
  }
  alldata.push(innerArray);
}
console.log( JSON.stringify(alldata));
let productDetail={
  details:JSON.stringify(alldata),
}
productDetailpricing=productDetail;
console.log(productDetailpricing);
 
  // const val=this.productclass.saveProduct(productDetail);
  // if(val)
  // {
  //   this.clearAllCell();
  // }
 return JSON.stringify(alldata);
//  this.submitdata();
}