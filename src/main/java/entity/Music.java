package entity;

import javax.persistence.*;

@Entity
@Table(name = "musicsystem_info", schema = "musicsystem", catalog = "")
public class Music {
    private int id;
    private String name;
    private String singer;
    private String time;
    private String url;

    @Id
    @Column(name = "Id")
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "Name")
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Basic
    @Column(name = "Singer")
    public String getSinger() {
        return singer;
    }

    public void setSinger(String singer) {
        this.singer = singer;
    }

    @Basic
    @Column(name = "Time")
    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    @Basic
    @Column(name = "Url")
    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Music music = (Music) o;

        if (id != music.id) return false;
        if (name != null ? !name.equals(music.name) : music.name != null) return false;
        if (singer != null ? !singer.equals(music.singer) : music.singer != null) return false;
        if (time != null ? !time.equals(music.time) : music.time != null) return false;
        if (url != null ? !url.equals(music.url) : music.url != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (name != null ? name.hashCode() : 0);
        result = 31 * result + (singer != null ? singer.hashCode() : 0);
        result = 31 * result + (time != null ? time.hashCode() : 0);
        result = 31 * result + (url != null ? url.hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return "Music{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", singer='" + singer + '\'' +
                ", time='" + time + '\'' +
                ", url='" + url + '\'' +
                '}';
    }
}
