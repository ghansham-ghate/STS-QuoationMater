export class QuotationDetail{
    intQuotation_detail_id:number;
    intQuotation_id:number; 
    intItem_id:number; 
    nvcharItem_code:string;
    nvcharItem_description:string;
    decUnit_price:number;
    decQuantity:number; 
    decAmount:number; 
    decTax_add:number;
    decNet_amount:number; 
    nvcharTax_description:string;
    nvcharPONumber:string;
    decPo_received_quantity:number; 
    decPo_pending_quantity:number; 
    decPo_price:number; 
    decPo_remaining_price:number;
    NvcharDescription:string
    DtDateofCreation:number
    DtDateofModification:number
    YnDeleted:boolean;
    // Item_code:string ; 
    // Item_description:string; 
    // Unit_price:number ; 
    // Quantity:number; 
    // Amount :number; 
    // Tax_add :number; 
    // Net_amount:number; 
    // Tax_description:string; 
    // Po_no: number; 
    // Po_received_quantity:number;
    // Po_pending_quantity:    number;
    // Po_price:number;
    // Po_remaining_price:number;
}