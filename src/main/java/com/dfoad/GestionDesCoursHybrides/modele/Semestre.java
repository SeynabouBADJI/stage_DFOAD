package com.dfoad.GestionDesCoursHybrides.modele;
import java.util.Date;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data @NoArgsConstructor @AllArgsConstructor
public class Semestre {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id ;
    private Integer numero;
    private Date dateDebut;
    private Date dateFin;
    @JsonIgnore
    @OneToMany(mappedBy = "semestre")
    private List<Parcours> parcours;
    @JsonIgnore
    @OneToMany(mappedBy = "semestre")
    private List<Niveau> Niveau;
    
}
