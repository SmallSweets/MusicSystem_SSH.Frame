package dao.admin;

public interface AdminDao {
    String login(String name,String password);

    Object showAllMusic();

    void delete(String id);

    void addMusic(Object object);

    void searchMusic();

    Object showAllUser();

    Object searchUser(String input);

    Object selfInfo(String name);
}
