using From.Models;
using MySqlConnector;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Configuration;
using System.Data.SqlClient;
using System.Net;
using System.Data;
using System.Xml.Linq;
using System.IO;
using System.Web.UI.WebControls;
using System.Text;
using System.Reflection;
using System.Drawing.Imaging;
using System.Data.Entity;

namespace From.Controllers
{
    public class HomeController : Controller
    {
        form2dbEntities db = new form2dbEntities();
        public ActionResult Index()
        {
            List<userdb> list = new List<userdb>();
            try
            {

                var data = db.userdbs.ToList();

                var UserData_InDescOrder = data.OrderByDescending(c => c.userid);

                foreach (var item in UserData_InDescOrder)
                {
                    if (item != null)
                    {
                        userdb model = new userdb();
                        model.userid = item.userid;
                        model.User_Name = item.User_Name;
                        model.Email = item.Email;
                        model.Contact = item.Contact;
                        model.Gender = item.Gender;
                        model.Date_Of_Birth = item.Date_Of_Birth;
                        model.Address = item.Address;
                        model.Country = item.Country;
                        model.State = item.State;
                        model.Hobbies = item.Hobbies;
                        model.Password = item.Password;
                        // Session["img"] = item.ImagePath;
                        model.ImagePath = Url.Content(item.ImagePath);
                        list.Add(model);
                    }
                }
            }
            catch (Exception ex)
            {
                var e = new Exception(ex.Message);
            }
            finally
            {

            }

            return View(list);
            //return View(db.userdbs.ToList());
        }

      
       /* public ActionResult Getdata(string search)
        {
            List<userdb> model = new List<userdb>();
            userdb userdb = new userdb();
            model = db.userdbs.Where(e => e.User_Name.StartsWith(search)).ToList();
            
            return View(model);
        }*/
        /*public List<userdb> getUsers(string search,string sort,string sortdir,int skip,int pageSize,out int totalRecord)
        {
            var v = (from a in db.userdbs where
                     a.User_Name.Contains(search) ||
                     a.Email.Contains(search) ||
                     a.Contact.Contains(search)
                     select a
                     );
            totalRecord = v.Count();
            v = v.OrderBy(a => a.User_Name);
            if (pageSize > 0)
            {
                v=v.Skip(skip).Take(pageSize);
            }
            return v.ToList();
        }*/

        [HttpPost]
        public JsonResult AddUserRecord(userdb model)
        {
            try
            {

                string fileName = Path.GetFileNameWithoutExtension(model.FileName.FileName);
                string extension = Path.GetExtension(model.FileName.FileName);
                HttpPostedFileBase postedFile = model.FileName;
                string FileLength = Convert.ToString(postedFile.ContentLength);

                fileName += extension;
                model.ImagePath = "~/images/" + fileName;
                fileName = Path.Combine(Server.MapPath("~/images/"), fileName);

                model.FileName.SaveAs(fileName);

                db.userdbs.Add(model);
                db.SaveChanges();

                return Json("Data Saved.", JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                var e = ex.Message;
                throw ex;
            }
        }



        [HttpPost]
        public JsonResult Update(userdb model)
        {
            List<userdb> list = new List<userdb>();
            if (model.FileName != null)
            {
                string fileName = Path.GetFileNameWithoutExtension(model.FileName.FileName);
                string extension = Path.GetExtension(model.FileName.FileName);
                HttpPostedFileBase postedFile = model.FileName;
                string FileLength = Convert.ToString(postedFile.ContentLength);

                fileName += extension;
                model.ImagePath = "~/images/" + fileName;
                fileName = Path.Combine(Server.MapPath("~/images/"), fileName);

                model.FileName.SaveAs(fileName);
                userdb user = db.userdbs.Where(u => u.userid == model.userid).FirstOrDefault();
                user.User_Name = model.User_Name;
                user.Email = model.Email;
                user.Contact = model.Contact;
                user.Gender = model.Gender;
                user.Date_Of_Birth = model.Date_Of_Birth;
                user.Address = model.Address;
                user.Country = model.Country;
                user.State = model.State;
                user.Hobbies = model.Hobbies;
                user.ImagePath = model.ImagePath;
                db.Entry(user).State = EntityState.Modified;
                db.SaveChanges();
                user.ImagePath = Url.Content(user.ImagePath);
                return Json(user, JsonRequestBehavior.AllowGet);

            }
            else
            {
                userdb user = db.userdbs.Where(em => em.userid == model.userid).FirstOrDefault();

                user.User_Name = model.User_Name;
                user.Email = model.Email;
                user.Contact = model.Contact;
                user.Gender = model.Gender;
                user.Date_Of_Birth = model.Date_Of_Birth;
                user.Address = model.Address;
                user.Country = model.Country;
                user.State = model.State;
                user.Hobbies = model.Hobbies;


                db.Entry(user).State = EntityState.Modified;
                db.SaveChanges();
                user.ImagePath = Url.Content(user.ImagePath);

                return Json(user, JsonRequestBehavior.AllowGet);
            }

        }


        public JsonResult Edit(int id)
        {

            try
            {
                var data = db.userdbs.Where(u => u.userid == id).FirstOrDefault();

                /*string fileName = Path.Combine(Server.MapPath(dr["ImagePath"].ToString()));
                model.ImagePath = fileName;*/
                string filePath = Url.Content(data.ImagePath);
                data.ImagePath = filePath;


                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                var e = ex.Message;

            }
            finally
            {

            }
            return Json("Not Found Data", JsonRequestBehavior.AllowGet);
        }

        public JsonResult Delete(int id)
        {
            try
            {
                var delData = db.userdbs.Where(u => u.userid == id).FirstOrDefault();
                db.userdbs.Remove(delData); db.SaveChanges();
                return Json("Data Deleted", JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                var e = ex.Message;
                throw ex;

            }
            finally
            {

            }
        }

        public JsonResult ImgView(int id)
        {
            try
            {

                var img = db.userdbs.Where(u => u.userid == id).FirstOrDefault();

                string imgPath = Url.Content(img.ImagePath);

                //  string fileName = Path.GetFileName(dr["ImagePath"].ToString().FileName);
                //string fileName = Path.Combine(Server.MapPath(dataFile));


                return Json(imgPath, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                var e = ex.Message;
                throw ex;
            }
            finally
            {

            }
        }



        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";


            return View();
        }


        public static string encryptPassword(string password)
        {
            byte[] storePass = ASCIIEncoding.ASCII.GetBytes(password);
            string encryptPass = Convert.ToBase64String(storePass);
            return encryptPass;
        }
        public static string decryptPassword(string password)
        {

            byte[] encryptPass = Convert.FromBase64String(password);
            string storePass = ASCIIEncoding.ASCII.GetString(encryptPass);
            return storePass;
        }
    }
}
        /*public JsonResult UserRegister()
        {
            List<UserRegisterModel> list = new List<UserRegisterModel>();
            try
            {
                MySqlCommand cmd = new MySqlCommand("sp_ViewAllData", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                MySqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    UserRegisterModel model = new UserRegisterModel();
                    model.Userid = Convert.ToInt32(dr["Userid"]);
                    model.Username = Convert.ToString(dr["User_Name"]);
                    model.Email = Convert.ToString(dr["Email"]);
                    model.Gender = Convert.ToString(dr["Gender"]);
                    model.Contact = Convert.ToString(dr["Contact"]);
                    model.DateOfBirth = DateTime.Parse(dr["Date_Of_Birth"].ToString());
                    model.Address = Convert.ToString(dr["Address"]);
                    model.Country = Convert.ToString(dr["Country"]);
                    model.State = Convert.ToString(dr["State"]);
                    model.Hobbies = Convert.ToString(dr["Hobbies"]);
                    
                    string filePath = Url.Content(dr["ImagePath"].ToString());
                    model.ImagePath = filePath;
                    list.Add(model);
                }
                con.Close();
                return Json(list, JsonRequestBehavior.AllowGet);
                

            }
            catch (Exception ex)
            {
                var e = ex.Message;
                throw ex;
            }

            finally
            {
                con.Close();
            }
        }*//*
        [HttpPost]
        public JsonResult AddUserRecord(UserRegisterModel model)
        {
            try
            {
                string fileName = Path.GetFileNameWithoutExtension(model.FileName.FileName);
                string extension = Path.GetExtension(model.FileName.FileName);
                HttpPostedFileBase postedFile = model.FileName;
                string FileLength = Convert.ToString(postedFile.ContentLength);

                        fileName += extension;
                        model.ImagePath = "~/images/" + fileName;
                        fileName = Path.Combine(Server.MapPath("~/images/"), fileName);

                        model.FileName.SaveAs(fileName);
                        MySqlCommand cmd = new MySqlCommand("sp_InsertAllData", con);
                cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@name", MySqlDbType.VarChar, 50).Value = model.Username;
                       
                        cmd.Parameters.Add("@email", MySqlDbType.VarChar, 50).Value = model.Email;
                        cmd.Parameters.Add("@contact", MySqlDbType.VarChar, 50).Value = model.Contact;
                        cmd.Parameters.Add("@gender", MySqlDbType.VarChar, 50).Value = model.Gender; 
                        cmd.Parameters.Add("@DateOfbirth", MySqlDbType.VarChar, 50).Value = model.DateOfBirth;
                        cmd.Parameters.Add("@address", MySqlDbType.VarChar, 50).Value = model.Address;
                        cmd.Parameters.Add("@hobbies", MySqlDbType.VarChar, 50).Value = model.Hobbies;
                        cmd.Parameters.Add("@country", MySqlDbType.VarChar, 50).Value = model.Country;
                        cmd.Parameters.Add("@state", MySqlDbType.VarChar, 50).Value = model.State;
                        cmd.Parameters.Add("@passowrd", MySqlDbType.VarChar, 50).Value =  encryptPassword(model.Password);
                        cmd.Parameters.Add("@imagepath", MySqlDbType.VarChar, 1000).Value = model.ImagePath;
                        con.Open();
                        cmd.ExecuteNonQuery();
                        return Json("Data Saved.", JsonRequestBehavior.AllowGet);
                                           
            }catch(Exception ex)
            {
                var e = ex.Message;
                throw ex;
            }
        }

       *//* public JsonResult Edit(int id)
        {
            
                List<UserRegisterModel> list = new List<UserRegisterModel>();
                try
                {
                    MySqlCommand cmd = new MySqlCommand("sp_SearchData", con);

                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add("@id", MySqlDbType.VarChar, 50).Value = id;
                    con.Open();
                    MySqlDataReader dr = cmd.ExecuteReader();
                    while (dr.Read())
                    {
                        UserRegisterModel model = new UserRegisterModel();
                        model.Userid = dr.GetInt32("Userid");
                        model.Username = Convert.ToString(dr["User_Name"]);
                        model.Email = Convert.ToString(dr["Email"]);
                        model.Gender = Convert.ToString(dr["Gender"]);
                        model.Contact = Convert.ToString(dr["Contact"]);
                        model.DateOfBirth = DateTime.Parse(dr["Date_Of_Birth"].ToString());
                        model.Address = Convert.ToString(dr["Address"]);
                        model.Country = Convert.ToString(dr["Country"]);
                        model.State = Convert.ToString(dr["State"]);
                        model.Hobbies = Convert.ToString(dr["Hobbies"]);
                    *//*string fileName = Path.Combine(Server.MapPath(dr["ImagePath"].ToString()));
                    model.ImagePath = fileName;*//*
                    string filePath = Url.Content(dr["ImagePath"].ToString());
                    model.ImagePath = filePath;
                        list.Add(model);
                    }
                    con.Close();

                    return Json(list, JsonRequestBehavior.AllowGet);
                } catch (Exception ex)
                {
                    var e = ex.Message;
                    throw ex;
                }
                finally
                {
                    con.Close();
                }
            }*//*
        [HttpPost]
        public JsonResult Update(UserRegisterModel model)
        {
           
            try
            {
                if (model.FileName != null)
                {
                    string fileName = Path.GetFileNameWithoutExtension(model.FileName.FileName);
                    string extension = Path.GetExtension(model.FileName.FileName);
                    HttpPostedFileBase postedFile = model.FileName;
                    string FileLength = Convert.ToString(postedFile.ContentLength);

                    fileName += extension;
                    model.ImagePath = "~/images/" + fileName;
                    fileName = Path.Combine(Server.MapPath("~/images/"), fileName);

                    model.FileName.SaveAs(fileName);

                    MySqlCommand cmd = new MySqlCommand("sp_UpdateData", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@check", true);
                    cmd.Parameters.AddWithValue("@id", model.Userid);
                    cmd.Parameters.AddWithValue("@name", model.Username);
                    cmd.Parameters.AddWithValue("@email", model.Email);
                    cmd.Parameters.AddWithValue("@contact", model.Contact);
                    cmd.Parameters.AddWithValue("@gender", model.Gender);
                    cmd.Parameters.AddWithValue("@DateOfbirth", model.DateOfBirth);
                    cmd.Parameters.AddWithValue("@address", model.Address);
                    cmd.Parameters.AddWithValue("@hobbies", model.Hobbies);
                    cmd.Parameters.AddWithValue("@country", model.Country);
                    cmd.Parameters.AddWithValue("@state", model.State);
                    cmd.Parameters.AddWithValue("@imagepath", model.ImagePath);
                    //cmd.Parameters.AddWithValue("@password", model.Password);
                    con.Open();
                    cmd.ExecuteNonQuery();
                    con.Close();
                    return Json("Data Saved", JsonRequestBehavior.AllowGet);
                }
                else
                {
                    MySqlCommand cmd = new MySqlCommand("sp_UpdateData", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@check", false);
                    cmd.Parameters.AddWithValue("@id", model.Userid);
                    cmd.Parameters.AddWithValue("@name", model.Username);
                    cmd.Parameters.AddWithValue("@email", model.Email);
                    cmd.Parameters.AddWithValue("@contact", model.Contact);
                    cmd.Parameters.AddWithValue("@gender", model.Gender);
                    cmd.Parameters.AddWithValue("@DateOfbirth", model.DateOfBirth);
                    cmd.Parameters.AddWithValue("@address", model.Address);
                    cmd.Parameters.AddWithValue("@hobbies", model.Hobbies);
                    cmd.Parameters.AddWithValue("@country", model.Country);
                    cmd.Parameters.AddWithValue("@state", model.State);
                    cmd.Parameters.AddWithValue("@imagepath", model.ImagePath);
                    //cmd.Parameters.AddWithValue("@password", model.Password);
                    con.Open();
                    cmd.ExecuteNonQuery();
                    con.Close();
                    return Json("Data Saved", JsonRequestBehavior.AllowGet);
                }
                
            }catch(Exception ex)
            {
                var e = ex.Message;
                throw ex;
            }
            finally
            {
                con.Close();
            }
          }

        public JsonResult Delete(int id)
        {
            try
            {
                MySqlCommand cmd = new MySqlCommand("sp_DeleteData", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@id", id);
                con.Open();
                cmd.ExecuteNonQuery();
                con.Close();
                return Json("Data Deleted", JsonRequestBehavior.AllowGet);
            }catch(Exception ex)
            {
                var e = ex.Message;
                throw ex;

            }
            finally
            {
                con.Close();
            }
        }


        public JsonResult ImgView(int id)
        {
            try
            {
                
                MySqlCommand cmd = new MySqlCommand("sp_GetImagePath", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@id", id);
                con.Open();
                MySqlDataReader dr = cmd.ExecuteReader();
                string imgPath = "";
                while (dr.Read())
                {
                    imgPath = Url.Content(dr["ImagePath"].ToString());
                }
                con.Close();
                //  string fileName = Path.GetFileName(dr["ImagePath"].ToString().FileName);
                //string fileName = Path.Combine(Server.MapPath(dataFile));
                

                return Json(imgPath, JsonRequestBehavior.AllowGet);
            }catch(Exception ex)
            {
                var e = ex.Message;
                throw ex;
            }
            finally
            {
                con.Close();
            }
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}*/