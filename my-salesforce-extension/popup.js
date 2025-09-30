document.getElementById('leadForm').onsubmit = async (e) => {
  e.preventDefault();
  const form = e.target;
  const lead = {
    firstName: form.firstName.value,
    lastName: form.lastName.value,
    email: form.email.value,
    company: form.company.value,
    phone: form.phone.value
  };
  // Replace localhost with your backend URL for deployment
  const resp = await fetch('http://localhost:3000/api/leads/bulk', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify([lead])
  });
  const data = await resp.json();
  alert(data.success ? 'Lead created!' : 'Error: ' + data.error);
};
