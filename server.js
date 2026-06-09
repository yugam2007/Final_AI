const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'views', 'index.html')));
app.get('/chat', (req, res) => res.sendFile(path.join(__dirname, 'views', 'chat.html')));
app.get('/dashboard', (req, res) => res.sendFile(path.join(__dirname, 'views', 'dashboard.html')));

// API: AI Advisor endpoint (mock AI responses)
app.post('/api/ask', (req, res) => {
  const { message } = req.body;
  const reply = getAIResponse(message);
  setTimeout(() => {
    res.json({ reply });
  }, 800); // simulate thinking delay
});

function getAIResponse(msg) {
  const input = msg.toLowerCase();

  if (input.includes('invest') || input.includes('stock') || input.includes('mutual fund')) {
    return "📈 Great question! For long-term investing, consider diversifying across equity mutual funds, index funds, and blue-chip stocks. In India, SIPs (Systematic Investment Plans) starting at ₹500/month are a great entry point.";
  }
  if (input.includes('budget') || input.includes('expense') || input.includes('spend')) {
    return "💰 A solid budgeting rule: follow the 50/30/20 method — 50% on needs, 30% on wants, and 20% on savings/investments. Track your expenses using apps like Walnut or YNAB.";
  }
  if (input.includes('loan') || input.includes('emi') || input.includes('debt')) {
    return "🏦 To manage loans smartly, always compare EMIs and total interest paid. Clear high-interest debt first (credit cards before personal loans).";
  }
  if (input.includes('tax') || input.includes('itr') || input.includes('deduction')) {
    return "🧾 Under Section 80C, you can save up to ₹1.5 lakh on investments in PPF, ELSS, LIC, etc. File your ITR before the due date to avoid penalties.";
  }
  if (input.includes('savings') || input.includes('save') || input.includes('fd') || input.includes('ppf')) {
    return "🏧 For safe savings: FDs offer ~7% interest, PPF gives ~7.1% tax-free, and RDs help with monthly discipline. Emergency fund target = 6 months of expenses.";
  }
  if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
    return "👋 Hello! I'm FinAI, your personal AI finance advisor. Ask me about investments, budgeting, loans, taxes, savings, or anything money-related.";
  }
  return "🤖 That's an interesting financial question! To give you the best advice, could you clarify whether you're asking about investing, saving, debt management, taxes, or insurance?";
}

app.listen(PORT, () => {
  console.log(`\n✅ FinAI Advisor running at http://localhost:${PORT}`);
  console.log(`   Press Ctrl+C to stop\n`);
});