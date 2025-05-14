import { Container, Title, Categories, SortPopup, TopBar, Filters, ProductsGroupList } from "@/components/custom"

export default function Home() {
  return <>
  
    <Container className="mt-8">
      <Title text="Best of the best" size='lg' className="font-extrabold"/>
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
              <ProductsGroupList items={[
              {
                id: 1,
                name: "No, I'm not ashamed",
                imageUrl: 'https://static.wixstatic.com/media/53a7c3_3bc1bc5093b74723ae95c92662f3106f~mv2.jpg/v1/fill/w_138,h_138,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/53a7c3_3bc1bc5093b74723ae95c92662f3106f~mv2.jpg',
                price: 10,
                items: [{price: 10}],
              },
              {
                id: 1,
                name: "No, I'm not ashamed",
                imageUrl: 'https://static.wixstatic.com/media/53a7c3_3bc1bc5093b74723ae95c92662f3106f~mv2.jpg/v1/fill/w_138,h_138,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/53a7c3_3bc1bc5093b74723ae95c92662f3106f~mv2.jpg',
                price: 10,
                items: [{price: 10}],
              },
              {
                id: 1,
                name: "No, I'm not ashamed",
                imageUrl: 'https://static.wixstatic.com/media/53a7c3_3bc1bc5093b74723ae95c92662f3106f~mv2.jpg/v1/fill/w_138,h_138,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/53a7c3_3bc1bc5093b74723ae95c92662f3106f~mv2.jpg',
                price: 10,
                items: [{price: 10}],
              },
              {
                id: 1,
                name: "No, I'm not ashamed",
                imageUrl: 'https://static.wixstatic.com/media/53a7c3_3bc1bc5093b74723ae95c92662f3106f~mv2.jpg/v1/fill/w_138,h_138,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/53a7c3_3bc1bc5093b74723ae95c92662f3106f~mv2.jpg',
                price: 10,
                items: [{price: 10}],
              },
              {
                id: 1,
                name: "No, I'm not ashamed",
                imageUrl: 'https://static.wixstatic.com/media/53a7c3_3bc1bc5093b74723ae95c92662f3106f~mv2.jpg/v1/fill/w_138,h_138,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/53a7c3_3bc1bc5093b74723ae95c92662f3106f~mv2.jpg',
                price: 10,
                items: [{price: 10}],
              },
              {
                id: 1,
                name: "No, I'm not ashamed",
                imageUrl: 'https://static.wixstatic.com/media/53a7c3_3bc1bc5093b74723ae95c92662f3106f~mv2.jpg/v1/fill/w_138,h_138,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/53a7c3_3bc1bc5093b74723ae95c92662f3106f~mv2.jpg',
                price: 10,
                items: [{price: 10}],
              },
              {
                id: 1,
                name: "No, I'm not ashamed",
                imageUrl: 'https://static.wixstatic.com/media/53a7c3_3bc1bc5093b74723ae95c92662f3106f~mv2.jpg/v1/fill/w_138,h_138,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/53a7c3_3bc1bc5093b74723ae95c92662f3106f~mv2.jpg',
                price: 10,
                items: [{price: 10}],
              },
              {
                id: 1,
                name: "No, I'm not ashamed",
                imageUrl: 'https://static.wixstatic.com/media/53a7c3_3bc1bc5093b74723ae95c92662f3106f~mv2.jpg/v1/fill/w_138,h_138,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/53a7c3_3bc1bc5093b74723ae95c92662f3106f~mv2.jpg',
                price: 10,
                items: [{price: 10}],
              },
              {
                id: 1,
                name: "No, I'm not ashamed",
                imageUrl: 'https://static.wixstatic.com/media/53a7c3_3bc1bc5093b74723ae95c92662f3106f~mv2.jpg/v1/fill/w_138,h_138,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/53a7c3_3bc1bc5093b74723ae95c92662f3106f~mv2.jpg',
                price: 10,
                items: [{price: 10}],
              },
              {
                id: 1,
                name: "No, I'm not ashamed",
                imageUrl: 'https://static.wixstatic.com/media/53a7c3_3bc1bc5093b74723ae95c92662f3106f~mv2.jpg/v1/fill/w_138,h_138,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/53a7c3_3bc1bc5093b74723ae95c92662f3106f~mv2.jpg',
                price: 10,
                items: [{price: 10}],
              },
              {
                id: 1,
                name: "No, I'm not ashamed",
                imageUrl: 'https://static.wixstatic.com/media/53a7c3_3bc1bc5093b74723ae95c92662f3106f~mv2.jpg/v1/fill/w_138,h_138,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/53a7c3_3bc1bc5093b74723ae95c92662f3106f~mv2.jpg',
                price: 10,
                items: [{price: 10}],
              }
              
              ]} categoryId={1}></ProductsGroupList>
          </div>
        </div>
      </div>
    </Container>
  </>
}
