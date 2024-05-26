import MobileSideNav from "./_components/MobileSideNav";
import NewForm from "./_components/NewForm";

export const metadata = {
  title: "IntelliForm / Dashboard",
};

function page() {
  return (
    <section className="w-full lg:px-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-extrabold">Dashboard</h1>
        <div className="lg:block hidden">
          <NewForm sideBar={false} />
        </div>
      </div>
    </section>
  );
}

export default page;
