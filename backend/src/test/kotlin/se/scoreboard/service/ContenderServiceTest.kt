package se.scoreboard.service

import org.junit.Assert.assertEquals
import org.junit.Test
import se.scoreboard.model.Problem
import se.scoreboard.service.ContenderService
import se.scoreboard.storage.FileDataStorage

internal class ContenderServiceTest {

    private val contenderService : ContenderService = ContenderService(FileDataStorage(), null)

    @Test
    fun testStuff() {
        val problems: List<Problem> = contenderService.getProblems();
        assertEquals(5, problems.size);
    }

}