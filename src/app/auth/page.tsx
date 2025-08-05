"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, Loader2, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { LoginCredentials, RegisterCredentials, UserRole } from '@/types';
import { ROLE_REDIRECT_MAP } from '@/utils/constants';

// Social login button component
interface SocialButtonProps {
  provider: 'google' | 'facebook' | 'apple';
  onClick: () => void;
  disabled: boolean;
}

const SocialButton: React.FC<SocialButtonProps> = ({ provider, onClick, disabled }) => {
  const configs = {
    google: {
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
      ),
      text: 'Continue with Google',
      bgColor: 'bg-white hover:bg-gray-50',
      textColor: 'text-gray-700',
      borderColor: 'border-gray-300'
    },
    facebook: {
      icon: (
        <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      text: 'Continue with Facebook',
      bgColor: 'bg-[#1877F2] hover:bg-[#166fe5]',
      textColor: 'text-white',
      borderColor: 'border-[#1877F2]'
    },
    apple: {
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.017 0C8.396 0 8.025.024 7.52.056 7.015.089 6.684.15 6.397.252a4.493 4.493 0 0 0-1.622 1.056A4.493 4.493 0 0 0 3.719 2.93c-.102.287-.163.618-.196 1.123C3.491 4.558 3.467 4.929 3.467 8.55v6.9c0 3.621.024 3.992.056 4.497.033.505.094.836.196 1.123.216.6.566 1.146 1.056 1.622s1.022.84 1.622 1.056c.287.102.618.163 1.123.196.505.032.876.056 4.497.056h6.9c3.621 0 3.992-.024 4.497-.056.505-.033.836-.094 1.123-.196a4.493 4.493 0 0 0 1.622-1.056 4.493 4.493 0 0 0 1.056-1.622c.102-.287.163-.618.196-1.123.032-.505.056-.876.056-4.497v-6.9c0-3.621-.024-3.992-.056-4.497-.033-.505-.094-.836-.196-1.123a4.493 4.493 0 0 0-1.056-1.622A4.493 4.493 0 0 0 19.877.252c-.287-.102-.618-.163-1.123-.196C18.249.024 17.878 0 14.257 0zm-.021 1.677h6.9c3.539 0 3.875.021 4.354.051.455.02.702.097.866.161.218.085.372.186.536.35.164.164.265.318.35.536.064.164.141.411.161.866.03.479.051.815.051 4.354v6.9c0 3.539-.021 3.875-.051 4.354-.02.455-.097.702-.161.866-.085.218-.186.372-.35.536-.164.164-.318.265-.536.35-.164.064-.411.141-.866.161-.479.03-.815.051-4.354.051h-6.9c-3.539 0-3.875-.021-4.354-.051-.455-.02-.702-.097-.866-.161a1.44 1.44 0 0 1-.536-.35 1.44 1.44 0 0 1-.35-.536c-.064-.164-.141-.411-.161-.866-.03-.479-.051-.815-.051-4.354v-6.9c0-3.539.021-3.875.051-4.354.02-.455.097-.702.161-.866.085-.218.186-.372.35-.536.164-.164.318-.265.536-.35.164-.064.411-.141.866-.161.479-.03.815-.051 4.354-.051z"/>
        </svg>
      ),
      text: 'Continue with Apple',
      bgColor: 'bg-black hover:bg-gray-800',
      textColor: 'text-white',
      borderColor: 'border-black'
    }
  };

  const config = configs[provider];

  return (
    <Button
      variant="outline"
      className={`w-full h-12 ${config.bgColor} ${config.textColor} ${config.borderColor} border-2 transition-all duration-200`}
      onClick={onClick}
      disabled={disabled}
    >
      {config.icon}
      <span className="ml-3 font-medium">{config.text}</span>
    </Button>
  );
};

const AuthPageContent: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, register, loginWithGoogle, loginWithFacebook, loginWithApple, isLoading, error, clearError, isAuthenticated, user } = useAuth();

  // Form states
  const [loginForm, setLoginForm] = useState<LoginCredentials>({
    email: '',
    password: ''
  });

  const [registerForm, setRegisterForm] = useState<RegisterCredentials>({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    role: 'student'
  });

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      const redirectTo = searchParams.get('redirect') || ROLE_REDIRECT_MAP[user.role];
      router.push(redirectTo);
    }
  }, [isAuthenticated, user, router, searchParams]);

  // Clear errors when switching forms
  const handleFormSwitch = () => {
    clearError();
    setIsLogin(!isLogin);
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(loginForm);
    if (success) {
      // Redirect will be handled by useEffect
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await register(registerForm);
    if (success) {
      // Redirect will be handled by useEffect
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'facebook' | 'apple') => {
    let result;
    switch (provider) {
      case 'google':
        result = await loginWithGoogle();
        break;
      case 'facebook':
        result = await loginWithFacebook();
        break;
      case 'apple':
        result = await loginWithApple();
        break;
    }

    if (result.success) {
      // Redirect will be handled by useEffect
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <motion.h1 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2"
          >
            Lojix
          </motion.h1>
          <p className="text-gray-600 hebrew-font">פלטפורמת הלמידה החכמה שלך</p>
        </div>

        <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl text-center hebrew-font">
              {isLogin ? 'כניסה לחשבון' : 'הרשמה חדשה'}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Social Login Buttons */}
            <div className="space-y-3">
              <SocialButton
                provider="google"
                onClick={() => handleSocialLogin('google')}
                disabled={isLoading}
              />
              <SocialButton
                provider="facebook"
                onClick={() => handleSocialLogin('facebook')}
                disabled={isLoading}
              />
              <SocialButton
                provider="apple"
                onClick={() => handleSocialLogin('apple')}
                disabled={isLoading}
              />
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-muted-foreground hebrew-font">או</span>
              </div>
            </div>

            {/* Login/Register Forms */}
            <AnimatePresence mode="wait">
              {isLogin ? (
                <motion.form
                  key="login"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onSubmit={handleLoginSubmit}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="login-email" className="hebrew-font">כתובת אימייל</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="your@email.com"
                        className="pl-10 h-12"
                        value={loginForm.email}
                        onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password" className="hebrew-font">סיסמה</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="login-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        className="pl-10 pr-10 h-12"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                        required
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-3 h-4 w-4 text-gray-400 hover:text-gray-600"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hebrew-font"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <ArrowRight className="h-4 w-4 mr-2" />
                    )}
                    כניסה
                  </Button>
                </motion.form>
              ) : (
                <motion.form
                  key="register"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleRegisterSubmit}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="register-name" className="hebrew-font">שם מלא</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="register-name"
                        type="text"
                        placeholder="השם שלך"
                        className="pl-10 h-12 hebrew-font"
                        value={registerForm.name}
                        onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-email" className="hebrew-font">כתובת אימייל</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="your@email.com"
                        className="pl-10 h-12"
                        value={registerForm.email}
                        onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-role" className="hebrew-font">תפקיד</Label>
                    <Select 
                      value={registerForm.role} 
                      onValueChange={(value: UserRole) => setRegisterForm({ ...registerForm, role: value })}
                      disabled={isLoading}
                    >
                      <SelectTrigger className="h-12">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="student" className="hebrew-font">תלמיד</SelectItem>
                        <SelectItem value="parent" className="hebrew-font">הורה</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-password" className="hebrew-font">סיסמה</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="register-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        className="pl-10 pr-10 h-12"
                        value={registerForm.password}
                        onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                        required
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-3 h-4 w-4 text-gray-400 hover:text-gray-600"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-confirm-password" className="hebrew-font">אימות סיסמה</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="register-confirm-password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        className="pl-10 pr-10 h-12"
                        value={registerForm.confirmPassword}
                        onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                        required
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-3 h-4 w-4 text-gray-400 hover:text-gray-600"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 hebrew-font"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <ArrowRight className="h-4 w-4 mr-2" />
                    )}
                    הרשמה
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>

            {/* Switch between login/register */}
            <div className="text-center">
              <button
                type="button"
                className="text-sm text-blue-600 hover:text-blue-800 hebrew-font underline"
                onClick={handleFormSwitch}
                disabled={isLoading}
              >
                {isLogin ? 'אין לך חשבון? הירשם כאן' : 'יש לך חשבון? התחבר כאן'}
              </button>
            </div>

            {/* Demo accounts info */}
            <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg hebrew-font">
              <div className="font-semibold mb-1">חשבונות דמו:</div>
              <div>תלמיד: test@student.com / password</div>
              <div>הורה: test@parent.com / password</div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

const AuthPage: React.FC = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.h1 
            className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4"
          >
            Lojix
          </motion.h1>
          <p className="text-gray-600 hebrew-font text-lg mb-8">פלטפורמת הלמידה החכמה שלך</p>
          
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"
          />
          
          <p className="text-gray-500 hebrew-font mt-4">טוען...</p>
        </motion.div>
      </div>
    }>
      <AuthPageContent />
    </Suspense>
  );
};

export default AuthPage;