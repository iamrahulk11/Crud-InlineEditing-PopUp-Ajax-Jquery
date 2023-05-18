using From.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data;
using System.IO;
using System.Web.UI.WebControls;
using System.Text;
using System.Data.Entity;

namespace From.Controllers
{
    public class HomeController : Controller
    {
        form2dbEntities db = new form2dbEntities();
        public ActionResult Index(int PageNumber=1)
        {
            List<userdb> list = new List<userdb>();
            try
            {
                
                var data = db.userdbs.ToList();

                var UserData_InDescOrder = data.OrderByDescending(c => c.userid).ToList();

                ViewBag.TotalPages = Math.Ceiling(UserData_InDescOrder.Count() / 3.0);

                UserData_InDescOrder= UserData_InDescOrder.Skip((PageNumber - 1) * 3).Take(3).ToList();

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
                        model.ImagePath = item.ImagePath;
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
        public ActionResult GetData()
        {
            return RedirectToAction("Index");
        }

        [HttpPost]
        public ActionResult GetData(string SearchText)
        {
            /*var v = (from a in db.userdbs
                     where
                     a.User_Name.Contains(search) ||
                     a.Email.Contains(search) ||
                     a.Contact.Contains(search)
                     select a
                     );
            totalRecord = v.Count();
            v = v.OrderBy(a => a.User_Name);*/
            if (SearchText == "" || SearchText==null)
            {
                return RedirectToAction("Index");
            }
            List<userdb> model = new List<userdb>();
            userdb userdb = new userdb();
            model = db.userdbs.Where(e => e.User_Name.Contains(SearchText)).ToList();

            return View("Index",model);
        }
        /*public List<userdb> getUsers(string search,string sort,string sortdir,int skip,int pageSize,out int totalRecord)
        {
            
           
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

                if (model.User_Name != null)
                {
                    user.User_Name = model.User_Name;
                }
                if (model.Email != null)
                {
                    user.Email = model.Email;
                }
                if (model.Contact != null)
                {
                    user.Contact = model.Contact;
                }
                if (model.Gender != null)
                {
                    user.Gender = model.Gender;
                }
                if (model.Date_Of_Birth != null)
                {
                    user.Date_Of_Birth = model.Date_Of_Birth;
                }
                if (model.Address != null)
                {
                    user.Address = model.Address;
                }
                if (model.Country != null)
                {
                    user.Country = model.Country;
                }
                if (model.State != null)
                {
                    user.State = model.State;
                }
                if (model.Hobbies != null)
                {
                    user.Hobbies = model.Hobbies;
                }
                
                user.ImagePath = model.ImagePath;
                db.Entry(user).State = EntityState.Modified;
                db.SaveChanges();
                user.ImagePath = Url.Content(user.ImagePath);
                return Json(user, JsonRequestBehavior.AllowGet);

            }
            else
            {
                userdb user = db.userdbs.Where(em => em.userid == model.userid).FirstOrDefault();

                if (model.User_Name != null)
                {
                    user.User_Name = model.User_Name;
                }
                if (model.Email != null)
                {
                    user.Email = model.Email;
                }
                if (model.Contact != null)
                {
                    user.Contact = model.Contact;
                }
                if (model.Gender != null)
                {
                    user.Gender = model.Gender;
                }
                if (model.Date_Of_Birth != null)
                {
                    user.Date_Of_Birth = model.Date_Of_Birth;
                }
                if (model.Address != null)
                {
                    user.Address = model.Address;
                }
                if (model.Country != null)
                {
                    user.Country = model.Country;
                }
                if (model.State != null)
                {
                    user.State = model.State;
                }
                if (model.Hobbies != null)
                {
                    user.Hobbies = model.Hobbies;
                }



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
    