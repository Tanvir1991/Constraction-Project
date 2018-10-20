using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using APP_SERVER.Models;

namespace APP_SERVER.Controllers
{
    public class PlotsController : ApiController
    {
        private DBPLOTEntities db = new DBPLOTEntities();

        // GET: api/Plots
        public IQueryable<Plot> GetPlots()
        {
            return db.Plots;
        }

        // GET: api/Plots/5
        [ResponseType(typeof(Plot))]
        public IHttpActionResult GetPlot(int id)
        {
            Plot plot = db.Plots.Find(id);
            if (plot == null)
            {
                return NotFound();
            }

            return Ok(plot);
        }

        // PUT: api/Plots/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutPlot(int id, Plot plot)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != plot.ID)
            {
                return BadRequest();
            }

            db.Entry(plot).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PlotExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Plots
        [ResponseType(typeof(Plot))]
        public IHttpActionResult PostPlot(Plot plot)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Plots.Add(plot);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = plot.ID }, plot);
        }

        // DELETE: api/Plots/5
        [ResponseType(typeof(Plot))]
        public IHttpActionResult DeletePlot(int id)
        {
            Plot plot = db.Plots.Find(id);
            if (plot == null)
            {
                return NotFound();
            }

            db.Plots.Remove(plot);
            db.SaveChanges();

            return Ok(plot);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PlotExists(int id)
        {
            return db.Plots.Count(e => e.ID == id) > 0;
        }
    }
}