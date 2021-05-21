package dao.admin.adminImpl;

import dao.admin.AdminDao;
import net.sf.json.JSONArray;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class AdminDaoImpl implements AdminDao {
    @Autowired
    private SessionFactory sessionFactory;

    private Transaction transaction;
    private Query query;
    private List list;
    private JSONArray jsonArray;

//    管理员登录
    public String login(String name,String password) {
        Session session = sessionFactory.openSession();
        query = session.createQuery("from Admin where name=?1 and password=?2");
        query.setParameter(1,name);
        query.setParameter(2,password);
        list = query.list();
        session.close();
        if (list.size() != 0){
            return "success";
        }else {
            return "error";
        }
    }

//    显示所有音乐信息
    public Object showAllMusic() {
        Session session = sessionFactory.openSession();
        query = session.createQuery("from Music");
        list = query.list();
        jsonArray = JSONArray.fromObject(list);
        session.close();
        return jsonArray;
    }

//    删除音乐信息
    public void delete(String id) {
        Session session = sessionFactory.openSession();
        transaction = session.beginTransaction();
        query = session.createQuery("delete from Music WHERE id = ?1");
        int mid = Integer.parseInt(id);
        query.setParameter(1,mid);
        query.executeUpdate();
        transaction.commit();
        session.close();
    }

//    添加音乐信息
    public void addMusic(Object object) {
        Session session = sessionFactory.openSession();
        transaction = session.beginTransaction();
        session.save(object);
        transaction.commit();
        session.close();
    }

    public void searchMusic() {

    }

    public Object showAllUser() {
        Session session = sessionFactory.openSession();
        query = session.createQuery("from User");
        list = query.list();
        jsonArray = JSONArray.fromObject(list);
        session.close();
        return jsonArray;
    }

    public Object searchUser(String input) {
        Session session = sessionFactory.openSession();
        query = session.createQuery("from User where id = ?1 or name = ?2 or password = ?3 or sex = ?4 or age = ?5 or address = ?6 or phone = ?7 or vip = ?8");
        try {
            query.setParameter(1,Integer.parseInt(input));
        }catch (NumberFormatException e){
            query.setParameter(1,0);
        }
        for (int i = 2;i < 9;i++){
            query.setParameter(i,input);
        }
        list = query.list();
        jsonArray = JSONArray.fromObject(list);
        session.close();
        return jsonArray;
    }

    public Object selfInfo(String name) {
        Session session = sessionFactory.openSession();
        query = session.createQuery("from Admin where name = ?1");
        query.setParameter(1,name);
        list = query.list();
        jsonArray = JSONArray.fromObject(list);
        session.close();
        return jsonArray;
    }
}
