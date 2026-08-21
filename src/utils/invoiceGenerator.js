import { jsPDF } from "jspdf";

export const generateInvoicePDF = (order) => {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth(); // 210
  const pageHeight = doc.internal.pageSize.getHeight(); // 297

  // --- BRANDING & HEADER ---
  // Background Accent strip
  doc.setFillColor(237, 176, 23); // #edb017
  doc.rect(0, 0, pageWidth, 8, "F");

  // Title / Logo
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(30, 30, 30);
  doc.text("PRIME Collection", 15, 25);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100);
  doc.text("Premium Fashion & E-Commerce", 15, 30);
  doc.text("support@primecollection.com", 15, 34);

  // Invoice Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(30, 30, 30);
  doc.text("INVOICE", pageWidth - 15, 25, { align: "right" });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text(`Invoice ID: #PRIME${order.orderId}`, pageWidth - 15, 32, { align: "right" });
  doc.setFont("helvetica", "normal");
  doc.text(`Date: ${new Date(order.orderDate).toLocaleDateString()}`, pageWidth - 15, 37, { align: "right" });
  doc.text(`Status: ${order.status || "Pending"}`, pageWidth - 15, 42, { align: "right" });

  // Divider Line
  doc.setDrawColor(220, 220, 220);
  doc.setLineWidth(0.5);
  doc.line(15, 48, pageWidth - 15, 48);

  // --- CLIENT & ORDER DETAILS ---
  let yPos = 56;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(30, 30, 30);
  doc.text("Billed To:", 15, yPos);
  doc.text("Order Info:", 110, yPos);

  yPos += 6;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(80, 80, 80);
  
  // Left Column (Billing Address)
  doc.text(order.customerName || "Customer", 15, yPos);
  
  // Handle long address line-wrapping
  const splitAddress = doc.splitTextToSize(order.address || "N/A", 80);
  let addrY = yPos + 5;
  splitAddress.forEach((line) => {
    doc.text(line, 15, addrY);
    addrY += 4.5;
  });
  
  doc.text(`Email: ${order.email}`, 15, addrY + 1);

  // Right Column (Order Info)
  doc.text(`Payment Method: ${order.paymentMethod || "N/A"}`, 110, yPos);
  doc.text(`Delivery Method: ${order.deliveryMethod || "N/A"}`, 110, yPos + 5);

  // Find max Y to place table below
  yPos = Math.max(addrY + 12, yPos + 18);

  // --- PRODUCTS TABLE ---
  // Table Header Box
  doc.setFillColor(245, 245, 245);
  doc.rect(15, yPos, pageWidth - 30, 8, "F");
  
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(30, 30, 30);
  doc.text("Item Description", 18, yPos + 5.5);
  doc.text("Qty", 125, yPos + 5.5, { align: "center" });
  doc.text("Price", 155, yPos + 5.5, { align: "right" });
  doc.text("Total", pageWidth - 18, yPos + 5.5, { align: "right" });

  yPos += 8; // move past header

  // Table Body Rows
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(60, 60, 60);

  order.products.forEach((prod, index) => {
    // Draw row separator line
    doc.setDrawColor(240, 240, 240);
    doc.line(15, yPos, pageWidth - 15, yPos);

    // Row Content
    // Wrap product name if too long
    const splitName = doc.splitTextToSize(prod.name, 95);
    const rowHeight = splitName.length * 5;
    
    splitName.forEach((line, lineIdx) => {
      doc.text(line, 18, yPos + 4.5 + (lineIdx * 4.5));
    });

    doc.text(String(prod.quantity), 125, yPos + 4.5, { align: "center" });
    doc.text(`INR ${Number(prod.price).toFixed(2)}`, 155, yPos + 4.5, { align: "right" });
    doc.text(`INR ${(Number(prod.price) * prod.quantity).toFixed(2)}`, pageWidth - 18, yPos + 4.5, { align: "right" });

    yPos += Math.max(rowHeight + 2, 7);
  });

  // End table line
  doc.setDrawColor(200, 200, 200);
  doc.line(15, yPos, pageWidth - 15, yPos);
  
  yPos += 8;

  // --- TOTALS SECTION ---
  const totalsX = pageWidth - 15;
  const labelsX = pageWidth - 60;
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(80, 80, 80);

  // Subtotal
  doc.text("Subtotal:", labelsX, yPos, { align: "right" });
  doc.text(`INR ${Number(order.subtotal || order.totalAmount).toFixed(2)}`, totalsX, yPos, { align: "right" });
  yPos += 5.5;

  // Discount
  if (order.discount > 0) {
    doc.text(`Discount (${order.coupon || "Coupon"}):`, labelsX, yPos, { align: "right" });
    doc.setTextColor(200, 50, 50); // Red for discount
    doc.text(`-INR ${Number(order.discount).toFixed(2)}`, totalsX, yPos, { align: "right" });
    doc.setTextColor(80, 80, 80);
    yPos += 5.5;
  }

  // Delivery
  doc.text("Delivery Charge:", labelsX, yPos, { align: "right" });
  doc.text(order.deliveryCharge > 0 ? `INR ${Number(order.deliveryCharge).toFixed(2)}` : "FREE", totalsX, yPos, { align: "right" });
  yPos += 7;

  // Draw a double line before Total
  doc.setDrawColor(220, 220, 220);
  doc.line(labelsX - 20, yPos - 2, totalsX, yPos - 2);

  // Grand Total
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(30, 30, 30);
  doc.text("Total Paid Amount:", labelsX, yPos, { align: "right" });
  doc.setTextColor(237, 176, 23); // accent color
  doc.text(`INR ${Number(order.totalAmount).toFixed(2)}`, totalsX, yPos, { align: "right" });

  // --- FOOTER ---
  const footerY = pageHeight - 25;
  doc.setDrawColor(230, 230, 230);
  doc.line(15, footerY, pageWidth - 15, footerY);

  doc.setFont("helvetica", "italic");
  doc.setFontSize(8.5);
  doc.setTextColor(140, 140, 140);
  doc.text("Thank you for shopping with PRIME Collection!", pageWidth / 2, footerY + 6, { align: "center" });
  doc.text("This is a computer-generated invoice and does not require a physical signature.", pageWidth / 2, footerY + 10, { align: "center" });

  // Save the PDF
  doc.save(`Invoice_PRIME${order.orderId}.pdf`);
};
