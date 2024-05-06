package com.dfoad.GestionDesCoursHybrides.modele;
import java.util.Date;
import java.util.List;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data @NoArgsConstructor @AllArgsConstructor
public class Departement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id ;
    private String libelle;
    private String abreviation;
    private String email;
    private String type;
    private Date dateCreation;
    private Date arreteCreation;
    @ManyToMany(mappedBy = "departements")
    private List<Formation> formations;
    @ManyToOne
    private Ufr ufr;
    
}
