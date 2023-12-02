import React from "react";
import imghotel from "../imgCss/img-hotel.jpg";

export const Home = () => {
  return (
    <div className="div-home">
      <div class="container ">
        <div class="row">
          <h1 className="text-white text-center">
            ¡Bienvenido a nuestro encantador hotel!
          </h1>
          <div class="col-lg-6 col-md-6 col-sm-6 mb-4">
            <div class="card " id="cardfotos">
              <img src={imghotel} alt="Imagen Hotel" id="cardfotos1" />
            </div>
          </div>
          <div class="col-lg-1 col-md-6 col-sm-6 mb-4">
            <div class="card" id="cardfotos"></div>
          </div>
          <div class="col-lg-5 col-md-6 col-sm-6 mb-4">
            <div class="card" id="cardfotos">
              <h3 className="h3-home">
                En nuestro rincón de tranquilidad, tu comodidad es nuestra
                máxima prioridad. Con un servicio excepcional y un ambiente
                acogedor, te brindamos una experiencia inolvidable llena de
                elegancia y calidez. Ya sea que estés aquí por negocios o
                placer, nuestro equipo dedicado estará encantado de hacerte
                sentir como en casa. Disfruta de nuestras lujosas instalaciones,
                deliciosa gastronomía y vistas panorámicas que te dejarán sin
                aliento.
              </h3>
            </div>
          </div>
        </div>
        <div class="row ">
          <div class="col-lg-5 col-md-6 col-sm-6 mb-4 align-self-center ">
            <div class="card  text-center" id="cardfotos">
              <h2 >AQUI EL MAPA PARA LLEGAR</h2>
              <p >¡Te aseguramos que tu estancia con nosotros será única y memorable! Bienvenido al oasis perfecto para relajarte y crear recuerdos inolvidables.</p>
              <i class="fa-solid fa-rocket"></i>
            </div>
          </div>
          <div class="col-lg-1 col-md-6 col-sm-6 mb-4">
            <div class="card" id="cardfotos"></div>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-6 mb-4 text-center">
            <div class="card" id="cardfotos">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7785.36523270219!2d-76.642049!3d-12.668803!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91056ff51a7cdad3%3A0xe68060c72500d86d!2sLa%20Huaca%2C%20Mala%2015608!5e0!3m2!1ses-419!2spe!4v1690947510854!5m2!1ses-419!2spe"
                height="350"
                style={{ border: "2px solid black", borderRadius: "10px" }}
                allowfullscreen=""
                loading="lazy"
                title="mapa"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
