using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
namespace From.Models
{
    public class UserRegisterModel
    {
        public int Userid { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Contact { get; set; }
        public string Gender { get; set; }
        
        public DateTime DateOfBirth { get; set; }
        public string Address { get; set; }
        public string Country { get; set; }
        public string State { get; set; }
        public string Hobbies { get; set; }
        public string Password { get; set; }
        public string ImagePath { get; set; }
        public HttpPostedFileBase FileName { get; set; }


        
    }
}