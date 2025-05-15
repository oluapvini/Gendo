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
    public class AppointmentController : ControllerBase
    {
        private IAppointmentService _service;

        public AppointmentController (IAppointmentService service){
            _service = service;
        }

        [Authorize("Bearer")]
        [HttpPost]
        [Route ("GetAllByFilter")]
        public async Task<ActionResult> GetAllByFilter([FromBody] AppointmentFilter filter){
            
            if(!ModelState.IsValid){
                return BadRequest(ModelState); //400 bad request - Solicitação Inválida
            }

            try{
                return Ok(await _service.GetAll(filter));
            }
            catch(ArgumentException e)
            {
                return StatusCode ((int) HttpStatusCode.InternalServerError, e.Message);
            }
        }

        [Authorize("Bearer")]
        [HttpPost]
        [Route ("GetLastAppointmentByDoctors")]
        public async Task<ActionResult> GetLastAppointmentByDoctors([FromBody] LastAppointmentByDoctorsFilter filter){
            
            if(!ModelState.IsValid){
                return BadRequest(ModelState); //400 bad request - Solicitação Inválida
            }

            try{
                return Ok(await _service.GetLastAppointmentByDoctors(filter));
            }
            catch(ArgumentException e)
            {
                return StatusCode ((int) HttpStatusCode.InternalServerError, e.Message);
            }
        }
        
        [Authorize("Bearer")]
        [HttpGet]
        [Route ("{id}", Name = "GetAppointmentWithId")]
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

        [HttpPost]
        
        public async Task<IActionResult> Post([FromBody] AppointmentPostDto appointment){

            if(!ModelState.IsValid){
                return BadRequest(ModelState);
            }

            try{
                var result = await _service.Post(appointment);

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

        public async Task<IActionResult> Put([FromBody] AppointmentPutDto appointment){

            if(!ModelState.IsValid){
                return BadRequest(ModelState);
            }

            try{

                var result = await _service.Put(appointment);

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