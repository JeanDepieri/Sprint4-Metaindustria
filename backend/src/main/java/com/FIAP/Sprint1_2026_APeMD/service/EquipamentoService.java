package com.FIAP.Sprint1_2026_APeMD.service;

import com.FIAP.Sprint1_2026_APeMD.model.Equipamento;
import com.FIAP.Sprint1_2026_APeMD.repository.EquipamentoRepository;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

@Service
public class EquipamentoService {

    private final EquipamentoRepository repository;

    public EquipamentoService(EquipamentoRepository repository) {
        this.repository = repository;
    }

    public Equipamento criar(Equipamento equipamento) {
        return repository.save(equipamento);
    }

    public List<Equipamento> listarTodos() {
        return repository.findAll();
    }

    public Equipamento buscarPorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Equipamento nao encontrado: " + id));
    }

    public Equipamento atualizar(Long id, Equipamento equipamentoAtualizado) {
        Equipamento existente = buscarPorId(id);
        existente.setNome(equipamentoAtualizado.getNome());
        existente.setSetor(equipamentoAtualizado.getSetor());
        existente.setStatusOperacional(equipamentoAtualizado.getStatusOperacional());
        existente.setUltimaManutencao(equipamentoAtualizado.getUltimaManutencao());
        return repository.save(existente);
    }

    public void remover(Long id) {
        Equipamento existente = buscarPorId(id);
        repository.delete(existente);
    }
}
