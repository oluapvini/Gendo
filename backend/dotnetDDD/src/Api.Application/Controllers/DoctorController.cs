using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Api.Domain.Dto.Appointment;
using Api.Domain.Dto.Setor;
using Api.Domain.Dto.User;
using Api.Domain.Entities;
using Api.Domain.Filter;
using Api.Domain.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Application.Controllers
{   
    [Route ("api/[controller]")]
    [ApiController]
    public class DoctorController : ControllerBase
    {
        private IDoctorService _service;

        public DoctorController (IDoctorService service){
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult> GetAll([FromQuery] DoctorFilter doctorFilter){
            
            if(!ModelState.IsValid){
                return BadRequest(ModelState); //400 bad request - Solicitação Inválida
            }

            try{
                return Ok(await _service.GetAll(doctorFilter));
            }
            catch(ArgumentException e)
            {
                return StatusCode ((int) HttpStatusCode.InternalServerError, e.Message);
            }
        }

        [HttpGet]
        [Route ("{id}", Name = "GetDoctorWithId")]
        public async Task<ActionResult> Get(Guid id){

            if(!ModelState.IsValid){
                return BadRequest(ModelState); //400 bad request - Solicitação Inválida
            }

            try{
                return Ok(await _service.Get(id));
            }catch(ArgumentException e)
            {
                return StatusCode((int) HttpStatusCode.InternalServerError, e.Message);
            }

        }

        [HttpGet]
        [Route ("Specialties")]
        public async Task<ActionResult> GetSpecialties(){

            if(!ModelState.IsValid){
                return BadRequest(ModelState); //400 bad request - Solicitação Inválida
            }

            try{
                return Ok(await _service.GetSpecialties());
            }catch(ArgumentException e)
            {
                return StatusCode((int) HttpStatusCode.InternalServerError, e.Message);
            }

        }

        [HttpGet]
        [Route ("States")]
        public async Task<ActionResult> GetStates(){

            if(!ModelState.IsValid){
                return BadRequest(ModelState); //400 bad request - Solicitação Inválida
            }

            try{
                return Ok(await _service.GetStates());
            }catch(ArgumentException e)
            {
                return StatusCode((int) HttpStatusCode.InternalServerError, e.Message);
            }
        }

        [HttpGet]
        [Route ("Cities")]
        public async Task<ActionResult> GetCitiesByState([FromQuery] string state){

            if(!ModelState.IsValid){
                return BadRequest(ModelState); //400 bad request - Solicitação Inválida
            }

            try{
                return Ok(await _service.GetCitiesByState(state));
            }catch(ArgumentException e)
            {
                return StatusCode((int) HttpStatusCode.InternalServerError, e.Message);
            }
        }

        [HttpPost]
        
        public async Task<IActionResult> Post([FromBody] DoctorEntity doctor){

            if(!ModelState.IsValid){
                return BadRequest(ModelState);
            }

            try{
                var result = await _service.Post(doctor);

                if(result != null){
                    return Ok(result);
                }

                else{
                    return BadRequest();
                }

            }catch(ArgumentException e){
                return StatusCode((int) HttpStatusCode.InternalServerError, e.Message);
            }
        }

        [Authorize("Bearer")]
        [HttpPut]

        public async Task<IActionResult> Put([FromBody] DoctorEntity doctor){

            if(!ModelState.IsValid){
                return BadRequest(ModelState);
            }

            try{

                var result = await _service.Put(doctor);

                if(result != null){
                    return Ok(result);
                }else{
                    return BadRequest();
                }

            }catch(ArgumentException e){
                return StatusCode((int) HttpStatusCode.InternalServerError, e.Message);
            }
        }

        [Authorize("Bearer")]
        [HttpDelete("{id}")]

        public async Task<IActionResult> Delete(Guid id){

            if(!ModelState.IsValid){
                return BadRequest(ModelState);
            }

            try{
                bool result = await _service.Delete(id);
                if(result){
                    return Ok();
                }else{
                    return BadRequest();
                }

            }catch(ArgumentException e){
                return StatusCode((int) HttpStatusCode.InternalServerError, e.Message);
            }
        }
    }
}