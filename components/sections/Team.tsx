"use client";

import { motion } from "framer-motion";
import SectionTitle from "../ui/SectionTitle";

const team = [
  {
    name: "Анна",
    role: "Косметолог",
    image: "/images/team/1.jpg",
  },
  {
    name: "Марія",
    role: "Стиліст",
    image: "/images/team/2.jpg",
  },
  {
    name: "Олена",
    role: "Майстер манікюру",
    image: "/images/team/3.jpg",
  },
];

export default function Team() {
  return (
    <section className="py-32">

      <div className="container-custom">

        <SectionTitle
          subtitle="Team"
          title="Наші майстри"
          center
        />

        <div className="mt-20 grid md:grid-cols-3 gap-10">

          {team.map((person, index) => (
            <motion.div

              key={person.name}

              initial={{ opacity: 0, y: 50 }}

              whileInView={{ opacity: 1, y: 0 }}

              viewport={{ once: true }}

              transition={{ delay: index * .15 }}

              className="group"
            >

              <div className="overflow-hidden rounded-[35px]">

                <img
                  src={person.image}
                  className="h-[500px] w-full object-cover transition duration-700 group-hover:scale-110"
                  alt={person.name}
                />

              </div>

              <h3 className="mt-8 text-3xl font-light">
                {person.name}
              </h3>

              <p className="text-gray-500">
                {person.role}
              </p>

            </motion.div>
          ))}

        </div>

      </div>

    </section>
  );
}