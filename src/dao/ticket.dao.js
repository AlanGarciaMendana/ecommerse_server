import TicketModel from "./models/ticket.model.js";

class TicketDao {
    async create(ticketData) {
        const ticket = new TicketModel(ticketData);
        return await ticket.save();
    }

    async findById(id) {
        return await TicketModel.findById(id);
    }
}

export default TicketDao;