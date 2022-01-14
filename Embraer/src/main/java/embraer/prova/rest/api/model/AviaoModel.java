package embraer.prova.rest.api.model;


import embraer.prova.rest.api.helper.DateHelper;
import javax.persistence.*;
import java.util.Date;

@Entity(name = "aviao")
public class AviaoModel {

    @Id
    @Column(name = "id")
    @SequenceGenerator(name = "aviao", sequenceName = "sq_aviao", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator = "aviao")
    private Long id;

    @Column(name = "nome", nullable = false, length = 50)
    private String nome;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "marca", nullable = false, length = 10)
    private AviaoMarca marca;
    
    @Column(name = "ano", nullable = false, length = 10)
    private int ano;

	@Column(name = "descricao", nullable = false, length = 100)
    private String descricao;

    @Column(name = "vendido")
    private boolean vendido;

    @Column(name = "created")
    @Temporal(TemporalType.TIMESTAMP)
    private Date created;

    @Column(name = "updated")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updated;
    
	public AviaoModel() {
	}
	
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		AviaoModel other = (AviaoModel) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}
    

    public long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public AviaoMarca getMarca() {
		return marca;
	}

	public void setMarca(AviaoMarca marca) {
		this.marca = marca;
	}

	public void setVendido(boolean vendido) {
		this.vendido = vendido;
	}

	public int getAno() {
        return ano;
    }

    public void setAno(int ano) {
        this.ano = ano;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Boolean getVendido() {
        return vendido;
    }

    public void setVendido(Boolean vendido) {
        this.vendido = vendido;
    }

    public Date getCreated() {
        return created;
    }

    public void setCreated(String created) {
        this.created = DateHelper.parseDateCustom(created, "dd/MM/yyyy HH:mm:ss");
    }

    public Date getUpdated() {
        return updated;
    }

    public void setUpdated(String updated) {
        this.updated = DateHelper.parseDateCustom(updated, "dd/MM/yyyy HH:mm:ss");
    }
	public void setCreated(Date created) {
		this.created = created;
	}

	public void setUpdated(Date updated) {
		this.updated = updated;
	}
   
}
