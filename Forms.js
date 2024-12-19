function showFormLog() 
{
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('regForm').style.display = 'none';
}

function showFormReg() 
{
    document.getElementById('regForm').style.display = 'block';
    document.getElementById('loginForm').style.display = 'none';
}

function closeForm() 
{
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('regForm').style.display = 'none';
    document.getElementById('mainForm').style.display = 'none';
}

function logOut() {
    window.location.href = "index.html";
    resetForm();
}
