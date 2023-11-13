namespace api.Models
{
    public class Book
    {
        public int BookID{get; set;}
        public string BookName{get; set;}
        public string BookAuthor{get; set;}
        public string BookGenre{get; set;}
        public string BookDescription{get; set;}
        public string BookImage{get; set;}
        public int NewQuantity{get; set;}
        public double NewPrice{get; set;}
        public int GoodQuantity{get; set;}
        public double GoodPrice{get; set;}
        public int PoorQuantity{get; set;}
        public double PoorPrice{get; set;}
        public int AdminID{get; set;}
    }
}