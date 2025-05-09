import React from "react";
import { useState } from "react";

export function DoctorCard() {

  return (
    <div>
        <div>
            <div>
                <div className="bigPerfilImg">
                        <img src="" alt="imagem perfil" />
                </div>
                <div>
                    <h3>DR.Thomas Turbelin</h3>
                    <p>Dermatologista</p>
                </div>
            </div>
            <div>
                <h3>Endereço</h3>
                <p>Rua. Conde sla das quantas 112 - lala</p>
            </div>
        </div>
        <div>
            <p>*TABELA COM HORARIOS</p>
        </div>
    </div>
  );
}


