import React from "react";
import { useState } from "react";
import { DoctorCard } from "../components/doctorCard/doctorCard";

export function Home() {

  return (
    <div className="home">
        <header className="home-header">
            <div>
                <p>&lt;</p>
                <p className="gendo-title">GENDO</p>
            </div>
            <img src="#" alt="icone agenda" />
            <h3>Minha agenda</h3>
        </header>
        <div className="user-info">
            <div className="perfil-img main-perfil-img">
                <img src="" alt="imagem perfil" />
            </div>
            <div class="user-info-datails">
                <h3>
                    Meu Nome da Silva
                </h3>
                <p>momepessoa15@gmail.com</p>
                <div class="user-type">
                    <p>Paciente</p>
                </div>
            </div>
            <button className="dark-btn">Editar perfil</button>
        </div>
        <section className="scheduler section">
            <h1>Agendar nova consulta</h1>
            <div className="scheduler-info">
                <div className="scheduler-location">
                    <h3>Região</h3>
                    <p>CEP:2737237</p>
                    <p>Rio de janero, RJ</p>
                    <p>Rua general almofadas, 2034</p>
                    <button className="blue-btn">Alterar</button>
                </div>
                <div>
                    <h3>Qual especialidade você procura?</h3>
                    <div className="select-container">
                        <select  name="" id="">
                            <option value="valor1">Valor 1</option>
                            <option value="valor2" selected>Valor 2</option>
                            <option value="valor3">Valor 3</option>
                        </select>
                    </div>
                </div>
            </div>
            <DoctorCard></DoctorCard>
            <DoctorCard></DoctorCard>
            <DoctorCard></DoctorCard>
        </section>
    </div>
  );
}


