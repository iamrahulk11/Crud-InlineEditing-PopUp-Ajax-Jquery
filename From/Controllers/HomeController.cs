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

namespace From.Controllers
{
    public class HomeController : Controller
    {
        MySqlConnection con = new MySqlConnection(ConfigurationManager.AppSettings["connectionString"]);
        public ActionResult Index()
        {
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
        public JsonResult UserRegister()
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
        }
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

        public JsonResult Edit(int id)
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
                    /*string fileName = Path.Combine(Server.MapPath(dr["ImagePath"].ToString()));
                    model.ImagePath = fileName;*/
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
            }
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
}