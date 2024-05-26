import FormList from "./_components/FormList";
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

      <h2 className="text-lg mb-4">List of Forms</h2>

      <FormList />
    </section>
  );
}

export default page;
