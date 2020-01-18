package se.scoreboard.service

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import se.scoreboard.data.domain.Contender
import se.scoreboard.data.domain.Raffle
import se.scoreboard.data.domain.RaffleWinner
import se.scoreboard.data.repo.RaffleWinnerRepository
import se.scoreboard.dto.RaffleWinnerDto
import se.scoreboard.mapper.AbstractMapper

@Service
class RaffleWinnerService @Autowired constructor(
    private val raffleWinnerRepository: RaffleWinnerRepository,
    override var entityMapper: AbstractMapper<RaffleWinner, RaffleWinnerDto>,
    val broadcastService: BroadcastService) : AbstractDataService<RaffleWinner, RaffleWinnerDto, Int>(
        raffleWinnerRepository) {

    override fun handleNested(entity: RaffleWinner, dto: RaffleWinnerDto) {
        entity.raffle = entityManager.getReference(Raffle::class.java, dto.raffleId)
        entity.contender = entityManager.getReference(Contender::class.java, dto.contenderId)
    }

    override fun onChange(old: RaffleWinner?, new: RaffleWinner) {
        if (old == null) {
            broadcastService.broadcast(new)
        }
    }
}