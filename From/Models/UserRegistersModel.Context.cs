﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace From.Models
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    using System.Data.Entity.Core.Objects;
    using System.Linq;
    
    public partial class form2dbEntities : DbContext
    {
        public form2dbEntities()
            : base("name=form2dbEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<userdb> userdbs { get; set; }
    
        public virtual int sp_DeleteSelectedData(Nullable<int> id)
        {
            var idParameter = id.HasValue ?
                new ObjectParameter("id", id) :
                new ObjectParameter("id", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("sp_DeleteSelectedData", idParameter);
        }
    
        public virtual ObjectResult<sp_GetImagePath_Result> sp_GetImagePath(Nullable<int> id)
        {
            var idParameter = id.HasValue ?
                new ObjectParameter("id", id) :
                new ObjectParameter("id", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<sp_GetImagePath_Result>("sp_GetImagePath", idParameter);
        }
    
        public virtual int sp_InsertAllData(string name, string email, string contact, string gender, Nullable<System.DateTime> dateOfbirth, string address, string hobbies, string country, string state, string passowrd, string imagepath)
        {
            var nameParameter = name != null ?
                new ObjectParameter("name", name) :
                new ObjectParameter("name", typeof(string));
    
            var emailParameter = email != null ?
                new ObjectParameter("email", email) :
                new ObjectParameter("email", typeof(string));
    
            var contactParameter = contact != null ?
                new ObjectParameter("contact", contact) :
                new ObjectParameter("contact", typeof(string));
    
            var genderParameter = gender != null ?
                new ObjectParameter("gender", gender) :
                new ObjectParameter("gender", typeof(string));
    
            var dateOfbirthParameter = dateOfbirth.HasValue ?
                new ObjectParameter("DateOfbirth", dateOfbirth) :
                new ObjectParameter("DateOfbirth", typeof(System.DateTime));
    
            var addressParameter = address != null ?
                new ObjectParameter("address", address) :
                new ObjectParameter("address", typeof(string));
    
            var hobbiesParameter = hobbies != null ?
                new ObjectParameter("hobbies", hobbies) :
                new ObjectParameter("hobbies", typeof(string));
    
            var countryParameter = country != null ?
                new ObjectParameter("country", country) :
                new ObjectParameter("country", typeof(string));
    
            var stateParameter = state != null ?
                new ObjectParameter("state", state) :
                new ObjectParameter("state", typeof(string));
    
            var passowrdParameter = passowrd != null ?
                new ObjectParameter("passowrd", passowrd) :
                new ObjectParameter("passowrd", typeof(string));
    
            var imagepathParameter = imagepath != null ?
                new ObjectParameter("imagepath", imagepath) :
                new ObjectParameter("imagepath", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("sp_InsertAllData", nameParameter, emailParameter, contactParameter, genderParameter, dateOfbirthParameter, addressParameter, hobbiesParameter, countryParameter, stateParameter, passowrdParameter, imagepathParameter);
        }
    
        public virtual ObjectResult<sp_ViewAllData_Result> sp_ViewAllData()
        {
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<sp_ViewAllData_Result>("sp_ViewAllData");
        }
    }
}