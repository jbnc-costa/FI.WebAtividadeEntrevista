using FI.AtividadeEntrevista.BLL;
using FI.AtividadeEntrevista.DML;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebAtividadeEntrevista.Models;

namespace WebAtividadeEntrevista.Controllers
{
    public class BeneficiarioController : Controller
    {
        [HttpPost]
        public JsonResult Incluir(BeneficiarioModel model)
        {
            BoBeneficiario bo = new BoBeneficiario();

            if (!this.ModelState.IsValid)
            {
                List<string> erros = (from item in ModelState.Values
                                      from error in item.Errors
                                      select error.ErrorMessage).ToList();

                Response.StatusCode = 400;
                return Json(string.Join(Environment.NewLine, erros));
            }
            else
            {
                string[] cpf = model.CPF.Replace("\"", "").Replace("[", "").Replace("]", "").Split(',');
                string[] nome = model.Nome.Replace("\"", "").Replace("[", "").Replace("]", "").Split(',');

                foreach (var item in cpf)
                {
                    if (!bo.CpfValido(item))
                    {
                        Response.StatusCode = 400;
                        return Json(string.Join(Environment.NewLine, "CPF invalido " + item + "."));
                    }

                    if (bo.VerificarExistencia(item))
                    {
                        Response.StatusCode = 400;
                        return Json(string.Join(Environment.NewLine, "CPF " + item + " já existente."));
                    }
                }

                int id = Convert.ToInt32(Session["idBeneficiario"].ToString());

                for (int i = 0; i < cpf.Length; i++)
                {
                    model.Id = bo.Incluir(new Beneficiario()
                    {
                        Nome = nome[i],
                        CPF = cpf[i],
                        IdCliente = id
                    });
                }

                return Json("Cadastro efetuado com sucesso");
            }
        }

        [HttpGet]
        public ActionResult Alterar(long id)
        {
            BoBeneficiario bo = new BoBeneficiario();
            Beneficiario beneficiario = bo.ConsultarPorIdCliente(id);
            Models.BeneficiarioModel modelBen = null;

            if (beneficiario != null)
            {
                modelBen = new BeneficiarioModel()
                {
                    Id = beneficiario.Id,
                    Nome = beneficiario.Nome,
                    CPF = beneficiario.CPF,
                    IdCliente = beneficiario.IdCliente
                };
            }

            return View(modelBen);
        }
    }
}