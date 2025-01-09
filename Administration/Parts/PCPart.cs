namespace Webshop.Parts
{
    abstract class PCPart
    {
        public string Brand;
        public string Model;
        public int Price;

        public PCPart(string brand, string model, int price)
        {
            this.Brand = brand;
            this.Model = model;
            this.Price = price;
        }

        //public Dictionary<string, object> GetSpecifications()
        //{
        //    Dictionary<string, object> baseSpecs = new Dictionary<string, object>
        //    {
        //        {"Brand", this.Brand},
        //        {"Model", this.Model},
        //    };

        //    foreach ((string key, object value) in this.getCustomSpecs())
        //    {

        //    }
        //}

        public abstract Dictionary<string, object> GetCustomSpecs();
    }
}