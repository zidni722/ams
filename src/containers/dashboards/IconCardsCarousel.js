import React from "react";
import IconCard from "../../components/cards/IconCard";
import GlideComponent from "../../components/carousel/GlideComponent";
import { reactLocalStorage } from "reactjs-localstorage";
import { apiClient } from "../../helpers/ApiService";

// let data = reactLocalStorage.getObject('iconCardsData')
const getData = () => {
  const module = reactLocalStorage.get('module') || 'borrows'
  // apiClient.get(`${module}/count-all-status`)
  //   .then((res) => {
  //     setTimeout(() => {
  //       const responseData = res.data.data
  //       const iconCardsData = [
  //         {
  //           title: 'Menunggu',
  //           icon1: "simple-icon-clock",
  //           valueMenunggu: responseData ? responseData.count_pending_status : 0
  //         },
  //         {
  //           title: 'Tolak',
  //           icon2: "simple-icon-close",
  //           valueTolak: responseData ? responseData.count_reject_status : 0
  //         },
  //         {
  //           title: 'Selesai',
  //           icon3: "simple-icon-check",
  //           valueSelesai: responseData ? responseData.count_success_status : 0
  //         },
  //       ]

  //       reactLocalStorage.setObject('iconCardsData', iconCardsData)
  //     }, 100);
  //   }).catch((e) => {
  //     console.log(e.message)
  //   });
}
const IconCardsCarousel = ({ className = "icon-cards-row", data }) => {
  console.log(data);
  console.log("data");
  setTimeout(() => {
    return (
      <div className={className}>
        <GlideComponent settings={
          {
            gap: 5,
            perView: 3,
            type: "",
            breakpoints: {
              320: { perView: 1 },
              576: { perView: 2 },
              1600: { perView: 3 }
            },
            hideNav: true
          }
        }>
          {data.map((item, index) => {
            return (
              <div key={`icon_card_${index}`}>
                <IconCard {...item} className="mb-4" />
              </div>
            );
          })}
        </GlideComponent>
      </div>
    );
  }, 100)
};
export default IconCardsCarousel;
