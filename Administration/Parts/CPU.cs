namespace Webshop.Parts
{
    class CPU : PCPart
    {
        public int Cores;
        public double ClockSpeed;

        public CPU(string brand, string model, int price, int cores, double clockspeed) : base(brand, model, price)
        {
            this.Cores = cores;
            this.ClockSpeed = clockspeed;
        }

        public override Dictionary<string, object> GetCustomSpecs()
        {
            return new Dictionary<string, object>
            {
                {"Cores", this.Cores},
                {"ClockSpeed", this.ClockSpeed}
            };
        }
    }
}