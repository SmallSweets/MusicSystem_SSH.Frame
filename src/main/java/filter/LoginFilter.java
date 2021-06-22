package filter;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

public class LoginFilter implements Filter {
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;

        //		在网站中获取session对象，如果没有则返回null
        HttpSession session = request.getSession(false);

        //		获取请求地址uri
        String uri = request.getRequestURI();


        //		当访问index.html文件时获取到的URI为 /MusicSystem_SSH_Frame_war_exploded/index.html，允许带有‘index’关键字的请求通过，允许注册页面通过
        if (uri.equals("/MusicSystem_SSH_Frame_war_exploded/") || uri.indexOf("index") != -1 || uri.indexOf("Register") != -1) {
            filterChain.doFilter(servletRequest, servletResponse);
            return;
        }

//        允许css，js文件，图片
        if (uri.indexOf(".css") != -1 || uri.indexOf(".js") != -1 || uri.indexOf(".jpg") != -1 || uri.indexOf(".png") != -1) {
            filterChain.doFilter(servletRequest, servletResponse);
            return;
        }


        //		如果session不为空，表明该用户为正常登录用户且成功登录，允许用户请求通过
        if (session != null) {
            filterChain.doFilter(servletRequest, servletResponse);
            return;
        }


        //		如果session为空，表明该用户不是正常登录用户或登录失败，将请求重定向到登录失败页面
        if (session == null) {
//            恶意登录访问普通用户功能
            if (uri.indexOf("customer") != -1){
                response.sendRedirect("/MusicSystem_SSH_Frame_war_exploded/");
//            恶意登录访问管理员用户功能
            }else if(uri.indexOf("admin") != -1){
                response.sendRedirect("/MusicSystem_SSH_Frame_war_exploded/admin/index.html");
            }
            return;
        }

    }

    public void destroy() {

    }
}
