using Application.Core;


namespace Application.Sevices
{
    public class ServiceParams: PagingParams
    {
        public DateTime StartDate { get; set; } = DateTime.Now.AddDays(-30);
        public DateTime EndDate { get; set; } = DateTime.Now;
    }
}
