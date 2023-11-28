namespace api.Models
{
    public class Order
    {
        public int OrderID{get; set;}
        public int? CID{get; set;}
        public string CustomerEmail{get; set;}
        public string CustomerFName{get; set;}
        public string CustomerLName{get; set;}
        public string CustomerAddress{get; set;}
        public string Country{get; set;}
        public string State{get; set;}
        public string Zipcode{get; set;}
    }
}