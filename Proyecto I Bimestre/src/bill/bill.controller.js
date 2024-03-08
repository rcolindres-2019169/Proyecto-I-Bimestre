'use strict'

import { checkUpdate } from '../utils/validator.js'
import Bill from './bill.model.js'
import { createWriteStream } from 'fs';
import PDFDocument from 'pdfkit';

export const save = async(req,res)=>{
    try{
        let data = req.body

        const products = data.products; 
        data.products = products;

        let bill = new Bill(data)
        await bill.save()
        
        return res.send({message: `Bill registered`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error registering bill', err: err})
    }
}

export const update = async (req,res) =>{
    try{
        let { id } = req.params
        let data = req.body
        let update = checkUpdate(data, id)
        if(!update) return res.status(400).send({message: 'Have submitted some data that cannot be updated or missing data'})
        let updatedBill = await Bill.findOneAndUpdate(
            {_id: id},
            data, 
            {new: true}
        )
        if(!updatedBill) return res.status(401).send({message: 'Bill not found and not updated'})
        return res.send({message: 'Updated bill', updatedBill})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error updating bill'})
    }
}

export const pdfview = async (req,res) =>{
    const billId = req.params.id;

    try {
      const bill = await Bill.findById(billId).populate('user').populate('buy'); // Buscar la factura por su ID y poblar los campos de referencia
  
      if (!bill) {
        throw new Error('La factura no fue encontrada');
      }
  
      const doc = new PDFDocument();
      const writeStream = createWriteStream('factura.pdf');
      doc.pipe(writeStream);
  
      doc.fontSize(16).text('Factura', { align: 'center' }).moveDown(0.5);
      doc.fontSize(14).text(`Factura #${bill._id}`, { underline: true }).moveDown(0.5);
      doc.fontSize(12).text(`Total: ${bill.buy.totalPrice}`).moveDown(0.5);
      doc.fontSize(12).text(`Fecha: ${bill.date}`).moveDown(0.5);
      doc.fontSize(12).text(`Usuario: ${bill.user.name}`).moveDown(0.5); 
      doc.fontSize(12).text(`Compra: ${bill.buy._id}`).moveDown(1);
  
      doc.end();
      console.log('PDF generado correctamente');
      res.send('PDF generado correctamente'); // Devuelve una respuesta al cliente
    } catch (error) {
      console.error('Error al generar el PDF:', error);
      res.status(500).send('Error al generar el PDF'); // Devuelve un error al cliente si ocurre un error
    }
  }
   
    
