import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [classCode, setClassCode] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const savedUser = localStorage.getItem('user');
    const savedUserRole = localStorage.getItem('userRole');
    const savedClassCode = localStorage.getItem('classCode');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedUserRole) {
      setUserRole(savedUserRole);
    }
    if (savedClassCode) {
      setClassCode(savedClassCode);
    }
    setIsLoading(false);
  }, []);

  const adminLogin = async (username, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (username === 'admin' && password === 'admin123') {
          const adminUser = {
            id: '1',
            name: 'Admin User',
            email: 'admin@university.edu',
            role: 'admin',
          };
          setUser(adminUser);
          setUserRole('admin');
          localStorage.setItem('user', JSON.stringify(adminUser));
          localStorage.setItem('userRole', 'admin');
          resolve(true);
        } else {
          resolve(false);
        }
      }, 1000);
    });
  };

  const studentSignup = async (name, email, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Check if email already exists
        const students = JSON.parse(localStorage.getItem('students') || '[]');
        const existingStudent = students.find((s) => s.email === email);
        
        if (existingStudent) {
          resolve(false); // Email already exists
          return;
        }
        
        // Create new student with role
        const newStudent = {
          id: Date.now().toString(),
          name,
          email,
          password,
          classCode: null,
          role: 'student'
        };
        
        // Save to localStorage
        students.push(newStudent);
        localStorage.setItem('students', JSON.stringify(students));
        
        // Auto-login the user
        setUser(newStudent);
        setUserRole('student');
        setClassCode(null);
        localStorage.setItem('user', JSON.stringify(newStudent));
        localStorage.setItem('userRole', 'student');
        localStorage.setItem('classCode', '');
        
        resolve(true);
      }, 1000);
    });
  };

  const studentLogin = async (email, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const students = JSON.parse(localStorage.getItem('students') || '[]');
        const student = students.find((s) => s.email === email && s.password === password);
        
        if (student) {
          setUser(student);
          setUserRole('student');
          setClassCode(student.classCode);
          localStorage.setItem('user', JSON.stringify(student));
          localStorage.setItem('userRole', 'student');
          localStorage.setItem('classCode', student.classCode || '');
          resolve(true);
        } else {
          resolve(false);
        }
      }, 1000);
    });
  };

  const joinClass = async (code) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Check if class exists
        const classes = JSON.parse(localStorage.getItem('classes') || '[]');
        const classExists = classes.find((c) => c.code === code.toUpperCase());
        
        if (classExists && user) {
          // Update student's class code
          const students = JSON.parse(localStorage.getItem('students') || '[]');
          const updatedStudents = students.map((s) => 
            s.id === user.id ? { ...s, classCode: code.toUpperCase() } : s
          );
          localStorage.setItem('students', JSON.stringify(updatedStudents));
          
          // Add student email to class's students array
          const updatedClasses = classes.map((c) => {
            if (c.code === code.toUpperCase()) {
              const studentExists = c.students && c.students.includes(user.email);
              if (!studentExists) {
                return {
                  ...c,
                  students: [...(c.students || []), user.email]
                };
              }
            }
            return c;
          });
          localStorage.setItem('classes', JSON.stringify(updatedClasses));
          
          // Update user state
          const updatedUser = { ...user, classCode: code.toUpperCase() };
          setUser(updatedUser);
          setClassCode(code.toUpperCase());
          localStorage.setItem('user', JSON.stringify(updatedUser));
          localStorage.setItem('classCode', code.toUpperCase());
          
          resolve(true);
        } else {
          resolve(false);
        }
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    setUserRole(null);
    setClassCode(null);
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
    localStorage.removeItem('classCode');
    window.location.href = '/';
  };

  const value = {
    userRole,
    user,
    classCode,
    isLoading,
    adminLogin,
    studentSignup,
    studentLogin,
    joinClass,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
