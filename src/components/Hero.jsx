import heroImage from "../assets/images/logo.svg";
export default function Hero() {
  return (
    <section className="container flex justify-center items-center">
      <div className="m-8 xl:mb-32">
        <img className="object-cover" src={heroImage} alt="Nagad Logo" />
      </div>
    </section>
  );
}
