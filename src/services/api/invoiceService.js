import invoicesData from "@/services/mockData/invoices.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let invoices = [...invoicesData];

export const invoiceService = {
  async getAll() {
    await delay(300);
    return [...invoices];
  },

  async getById(id) {
    await delay(200);
    const invoice = invoices.find(i => i.Id === parseInt(id));
    if (!invoice) {
      throw new Error("Invoice not found");
    }
    return { ...invoice };
  },

  async getByClientId(clientId) {
    await delay(250);
    return invoices.filter(i => i.clientId === parseInt(clientId));
  },

  async create(invoiceData) {
    await delay(400);
    const newInvoice = {
      ...invoiceData,
      Id: Math.max(...invoices.map(i => i.Id), 0) + 1,
      invoiceNumber: `INV-${new Date().getFullYear()}-${String(Math.max(...invoices.map(i => i.Id), 0) + 1).padStart(3, "0")}`,
      status: "draft",
      issueDate: new Date().toISOString().split("T")[0],
      paidDate: null
    };
    invoices.push(newInvoice);
    return { ...newInvoice };
  },

  async update(id, invoiceData) {
    await delay(350);
    const index = invoices.findIndex(i => i.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Invoice not found");
    }
    invoices[index] = { ...invoices[index], ...invoiceData };
    return { ...invoices[index] };
  },

  async delete(id) {
    await delay(300);
    const index = invoices.findIndex(i => i.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Invoice not found");
    }
    invoices.splice(index, 1);
    return true;
  }
};