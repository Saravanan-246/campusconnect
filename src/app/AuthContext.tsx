import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface UserInfo {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'student';
  classCode: string | null;
  department?: string;
  semester?: number;
}

interface AuthContextType {
  userRole: 'admin' | 'student' | null;
  user: UserInfo | null;
  classCode: string | null;
  isLoading: boolean;
  adminLogin: (username: string, password: string) => Promise<boolean>;
  studentSignup: (name: string, email: string, password: string) => Promise<boolean>;
  studentLogin: (email: string, password: string) => Promise<boolean>;
  joinClass: (code: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [userRole, setUserRole] = useState<'admin' | 'student' | null>(null);
  const [classCode, setClassCode] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedUserRole = localStorage.getItem('userRole');
    const savedClassCode = localStorage.getItem('classCode');

    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser) as UserInfo;
        setUser(parsed);
      } catch {
        localStorage.removeItem('user');
      }
    }
    if (savedUserRole === 'admin' || savedUserRole === 'student') {
      setUserRole(savedUserRole);
    }
    if (savedClassCode) {
      setClassCode(savedClassCode);
    }

    setIsLoading(false);
  }, []);

  const adminLogin = async (username: string, password: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (username === 'admin' && password === 'admin123') {
          const adminUser: UserInfo = {
            id: '1',
            name: 'Admin User',
            email: 'admin@university.edu',
            role: 'admin',
            classCode: null,
          };
          setUser(adminUser);
          setUserRole('admin');
          setClassCode(null);
          localStorage.setItem('user', JSON.stringify(adminUser));
          localStorage.setItem('userRole', 'admin');
          localStorage.setItem('classCode', '');
          resolve(true);
        } else {
          resolve(false);
        }
      }, 1000);
    });
  };

  const studentSignup = async (
    name: string,
    email: string,
    password: string,
  ): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const students = JSON.parse(localStorage.getItem('students') || '[]') as any[];
        const existingStudent = students.find((s) => s.email === email);

        if (existingStudent) {
          resolve(false);
          return;
        }

        const newStudent: UserInfo & { password: string } = {
          id: Date.now().toString(),
          name,
          email,
          password,
          classCode: null,
          role: 'student',
        };

        students.push(newStudent);
        localStorage.setItem('students', JSON.stringify(students));

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

  const studentLogin = async (email: string, password: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const students = JSON.parse(localStorage.getItem('students') || '[]') as any[];
        const student = students.find((s) => s.email === email && s.password === password);

        if (student) {
          const loggedIn: UserInfo = {
            id: student.id,
            name: student.name,
            email: student.email,
            role: 'student',
            classCode: student.classCode ?? null,
          };

          setUser(loggedIn);
          setUserRole('student');
          setClassCode(loggedIn.classCode);
          localStorage.setItem('user', JSON.stringify(loggedIn));
          localStorage.setItem('userRole', 'student');
          localStorage.setItem('classCode', loggedIn.classCode || '');
          resolve(true);
        } else {
          resolve(false);
        }
      }, 1000);
    });
  };

  const joinClass = async (code: string): Promise<boolean> => {
    const upperCode = code.toUpperCase().trim();

    return new Promise((resolve) => {
      setTimeout(() => {
        try {
          // Validate code format
          if (!upperCode || upperCode.length !== 6) {
            resolve(false);
            return;
          }

          const classes = JSON.parse(localStorage.getItem('classes') || '[]') as any[];
          const targetClass = classes.find((c) => c.code === upperCode);

          if (!targetClass) {
            resolve(false);
            return;
          }

          if (!user) {
            resolve(false);
            return;
          }

          // Check if student is already in this class
          const students = JSON.parse(localStorage.getItem('students') || '[]') as any[];
          const studentInClass = students.find((s) => s.email === user.email && s.classCode === upperCode);
          
          if (studentInClass) {
            resolve(false);
            return;
          }

          // Update student's class code
          const updatedStudents = students.map((s) =>
            s.id === user.id ? { ...s, classCode: upperCode } : s,
          );
          localStorage.setItem('students', JSON.stringify(updatedStudents));

          // Add student to class if not already there
          const currentStudents: string[] = Array.isArray(targetClass.students) ? targetClass.students : [];
          const alreadyInClass = currentStudents.includes(user.email);
          
          const updatedClasses = classes.map((c) => {
            if (c.code === upperCode) {
              return {
                ...c,
                students: alreadyInClass ? currentStudents : [...currentStudents, user.email]
              };
            }
            return c;
          });
          localStorage.setItem('classes', JSON.stringify(updatedClasses));

          // Update user state
          const updatedUser: UserInfo = { ...user, classCode: upperCode };
          setUser(updatedUser);
          setClassCode(upperCode);
          localStorage.setItem('user', JSON.stringify(updatedUser));
          localStorage.setItem('classCode', upperCode);

          resolve(true);
        } catch (error) {
          console.error('Join class error:', error);
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
  };

  const value: AuthContextType = {
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

export default AuthContext;
