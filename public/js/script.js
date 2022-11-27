const userData = document.getElementById('user');
const userEl = document.getElementById('userbtn');
const userMenuList = document.getElementById('user-list');
const blogData = document.getElementById('blogs');
const blogEl = document.getElementById('blogsbtn');
const blogMenuList = document.getElementById('blog-list');
const projectData = document.getElementById('projects');
const projectEl = document.getElementById('projectsbtn');
const projectMenuList = document.getElementById('project-list');
const mailData = document.getElementById('mails');
const mailEl = document.getElementById('mailsbtn');
const mailMenuList = document.getElementById('mail-list');

// user api docs get in view
const userObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      userFunction();
    }
  });
});

// blogs api docs get in view 
const blogObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      blogFunction();
    }
  });
});

// projects api docs get in view
const projectObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      projectFunction();
    }
  });
});

// mails api docs get in view
const mailObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      mailFunction();
    }
  });
});

userObserver.observe(userData);
blogObserver.observe(blogData);
projectObserver.observe(projectData);
mailObserver.observe(mailData);

function userFunction() {
  removeActive();
  userEl.classList.add('active');
  userMenuList.classList.remove('hidden');
}

function blogFunction(){
  removeActive();
  blogEl.classList.add('active');
  blogMenuList.classList.remove('hidden');
}

function projectFunction(){
  removeActive();
  projectEl.classList.add('active');
  projectMenuList.classList.remove('hidden');
}

function mailFunction(){
  removeActive();
  mailEl.classList.add('active');
  mailMenuList.classList.remove('hidden');
}

function removeActive() {
  userEl.classList.remove('active');
  blogEl.classList.remove('active');
  projectEl.classList.remove('active');
  mailEl.classList.remove('active');
  userMenuList.classList.add('hidden');
  blogMenuList.classList.add('hidden');
  projectMenuList.classList.add('hidden');
  mailMenuList.classList.add('hidden');
}
