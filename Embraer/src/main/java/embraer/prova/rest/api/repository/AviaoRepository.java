package embraer.prova.rest.api.repository;

import embraer.prova.rest.api.model.AviaoModel;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;


public interface AviaoRepository extends JpaRepository<AviaoModel, Long> {
	
	List<AviaoModel> findByNomeContaining(String nome);
}
