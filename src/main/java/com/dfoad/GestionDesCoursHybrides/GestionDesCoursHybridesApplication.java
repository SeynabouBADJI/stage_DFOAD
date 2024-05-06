package com.dfoad.GestionDesCoursHybrides;

import java.util.Date;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.dfoad.GestionDesCoursHybrides.modele.Cours;
import com.dfoad.GestionDesCoursHybrides.modele.Parcours;
import com.dfoad.GestionDesCoursHybrides.modele.ResponsableDfoad;
import com.dfoad.GestionDesCoursHybrides.modele.Semestre;
import com.dfoad.GestionDesCoursHybrides.modele.Titulaire;
import com.dfoad.GestionDesCoursHybrides.repository.ParcoursRepository;
import com.dfoad.GestionDesCoursHybrides.repository.ParcoursUeRepository;
import com.dfoad.GestionDesCoursHybrides.repository.SemestreRepository;
import com.dfoad.GestionDesCoursHybrides.service.CoursService;
import com.dfoad.GestionDesCoursHybrides.service.ResponsableDfoadService;
import com.dfoad.GestionDesCoursHybrides.service.TitulaireService;
import com.dfoad.GestionDesCoursHybrides.service.VacataireService;

@SpringBootApplication
public class GestionDesCoursHybridesApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(GestionDesCoursHybridesApplication.class, args);
	}

	@Autowired
	ResponsableDfoadService responsableDfoadService;
	@Autowired
	SemestreRepository semestreRepository;
	@Autowired
	ParcoursRepository parcoursRepository;
	@Autowired
	ParcoursUeRepository parcoursUeRepository;
	@Autowired
	TitulaireService titulaireService;
	@Autowired
	VacataireService vacataireService;
	@Autowired
	CoursService coursService;
	// @Autowired
	private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder(); // injection d'un encodeur de mot de

	@Override
	public void run(String... args) throws Exception {
		// Instancier des utilisateur
		ResponsableDfoad user = responsableDfoadService.ajouter_ResponsableDfoad(
				new ResponsableDfoad(null, "res", passwordEncoder.encode("res"), "Youssou", "DIENG",
						"admin", null));
		Semestre semestre1 = new Semestre();
		semestre1.setNumero(1);
		semestre1.setDateDebut(new Date());
		semestre1.setDateFin(new Date());
		semestre1 = semestreRepository.save(semestre1);
		// Les parcours
		Parcours parcours1 = parcoursRepository.save(new Parcours(null, "genie logiciel", null, null, semestre1));
		Parcours parcours2 = parcoursRepository.save(new Parcours(null, "genie", null, null, semestre1));
		// Les cours
		Cours c1 = coursService.ajouter_Cours(new Cours(null, "Math", null, null, null,
				null, null));
		Titulaire t1 = new Titulaire(null, "testPost");
		t1.setCours(c1);
		t1.setMatricule("testMatre");
		t1.setNom("DIOP");
		t1.setPrenom("Djiby");

		Titulaire t1Saving = titulaireService.ajouter_Titulaire(t1);

	}

}