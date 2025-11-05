import { ShieldCheck, Handshake, Home } from "lucide-react"; // You can use lucide-react or heroicons

const services = [
  {
    id: 1,
    icon: <ShieldCheck className="w-12 h-12 text-teal-600" />,
    title: "Best Rate Guarantee",
    description:
      "We guarantee the best prices for your stay at Twilight Guest House. Enjoy affordable rates without compromising on comfort and quality.",
  },
  {
    id: 2,
    icon: <Handshake className="w-12 h-12 text-teal-600" />,
    title: "Best Stay",
    description:
      "Experience the ultimate comfort and relaxation at Twilight Guest House. Our well-appointed rooms and peaceful ambiance ensure a memorable stay, offering the perfect blend of quality and tranquility.",
  },
  {
    id: 3,
    icon: <Home className="w-12 h-12 text-teal-600" />,
    title: "Best Service & Facility",
    description:
      "At Twilight Guest House, we pride ourselves on providing exceptional service and top-notch facilities. From clean, comfortable rooms to attentive hospitality, we ensure a seamless and enjoyable experience for every guest.",
  },
];

const Services = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10 text-center md:text-left">
        {services.map((service) => (
          <div key={service.id} className="space-y-4">
            <div className="flex justify-center md:justify-start">{service.icon}</div>
            <h3 className="text-2xl font-extrabold text-gray-900">{service.title}</h3>
            <p className="text-gray-600 leading-relaxed">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
