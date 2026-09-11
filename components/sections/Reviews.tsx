"use client";

import SectionTitle from "../ui/SectionTitle";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

const reviews = [
  {
    name: "Ірина",
    text: "Найкращий салон, у якому я була. Атмосфера, сервіс і результат — на найвищому рівні.",
  },
  {
    name: "Катерина",
    text: "Дуже привітний персонал і чудовий результат після кожного візиту.",
  },
  {
    name: "Оксана",
    text: "Сучасний інтер'єр, професійні майстри та якісний сервіс.",
  },
];

export default function Reviews() {
  return (
    <section className="bg-[#F8F5F2] py-32">

      <div className="container-custom">

        <SectionTitle
          subtitle="Reviews"
          title="Що говорять наші клієнти"
          center
        />

        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            1024: {
              slidesPerView: 2,
            },
          }}
          className="mt-20"
        >

          {reviews.map((review) => (
            <SwiperSlide key={review.name}>
              <div className="rounded-[35px] bg-white p-10 shadow-lg">

                <div className="mb-6 text-4xl text-[var(--accent)]">
                  ★★★★★
                </div>

                <p className="leading-8 text-gray-600">
                  {review.text}
                </p>

                <h3 className="mt-8 text-xl font-semibold">
                  {review.name}
                </h3>

              </div>
            </SwiperSlide>
          ))}

        </Swiper>

      </div>

    </section>
  );
}