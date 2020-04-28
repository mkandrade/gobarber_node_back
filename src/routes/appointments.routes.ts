/**
 * Rota: Receber a requisição
 * ou chamar outro arquivo, devolver uma resposta
 */

import { getCustomRepository } from 'typeorm';
import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
import ensureAuthenticated from '../middleware/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (request, response) => {
  //console.log(request.user);
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointment = await appointmentsRepository.find();
  return response.json(appointment);
});

appointmentsRouter.post('/', async (request, response) => {
  try {
    // nome do prestador : provider
    // data do agendamento : date
    const { provider_id, date } = request.body;

    // Convertendo date de string para date do javascript
    const parsedDate = parseISO(date);
    const createAppointment = new CreateAppointmentService();

    const appointment = await createAppointment.execute({
      date: parsedDate,
      provider_id,
    });
    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default appointmentsRouter;
