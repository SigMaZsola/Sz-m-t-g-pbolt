namespace Webshop.Parts
{
    class RAM : PCPart
    {
        public string Type;
        public int Capacity;
        public int Speed;
        public double Voltage;

        public RAM(string brand, string model, int price, string type, int capacity, int speed, double voltage) : base(brand, model, price)
        {
            this.Type = type;
            this.Capacity = capacity;
            this.Speed = speed;
            this.Voltage = voltage;
        }

        public override Dictionary<string, object> GetCustomSpecs()
        {
            return new Dictionary<string, object>
            {
                {"Type", this.Type},
                {"Capacity", this.Capacity},
                {"Speed", this.Speed},
                {"Voltage", this.Voltage}
            };
        }
    }
}