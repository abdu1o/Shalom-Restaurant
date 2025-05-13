import { Container, Title, Categories, SortPopup, TopBar, Filters } from "@/components/custom"

export default function Home() {
  return <>
  
    <Container className="mt-8">
      <Title text="Kosher menu" size='lg' className="font-extrabold"/>
    </Container>

    <TopBar/>
    <Container className="mt-10 pb-14">


      {/*filters*/}
      <div className="flex gap-[60px]">
        <div className="w-[250px]">
          <Filters></Filters>
        </div>

        {/*dish list*/}
        <div className="flex-1">
          <div className="flext flex-col gap-16">
            Dish list
          </div>
        </div>
      </div>
    </Container>
  </>
}
