package com.tltcode.naikamutv.homescreenchannel

import android.annotation.SuppressLint
import android.content.Context
import android.database.Cursor
import android.graphics.BitmapFactory
import android.media.tv.TvContract
import android.net.Uri
import android.os.Build
import androidx.annotation.RequiresApi
import androidx.annotation.VisibleForTesting
import androidx.tvprovider.media.tv.PreviewChannel
import androidx.tvprovider.media.tv.PreviewChannelHelper
import androidx.tvprovider.media.tv.PreviewProgram
import androidx.tvprovider.media.tv.TvContractCompat
import com.tltcode.naikamutv.R

//import com.tltcode.naikamutv.repository.VideoRepositoryFactory
//import com.tltcode.naikamutv.shared.datamodel.Video
//import com.tltcode.naikamutv.shared.datamodel.VideoType

/**
 * Helper class that simplifies interactions with the ATV home screen
 */
@RequiresApi(Build.VERSION_CODES.O)
class HomeScreenChannelHelper(private val previewChannelHelper: PreviewChannelHelper) {

    companion object {
        private const val DEFAULT_CHANNEL_ID = "DEFAULT_CHANNEL_ID"
        private const val DEFAULT_CHANNEL_LINK =
            "https://atv-reference-app.firebaseapp.com/channels/default"
    }

    // Creates a new default home screen channel and returns its ID
    fun createHomeScreenDefaultChannel(context: Context): Long {
        val logo = BitmapFactory.decodeResource(
            context.resources,
            R.mipmap.ic_channel_default
        )
        val defaultChannel = PreviewChannel.Builder()
            .setDisplayName(context.getString(R.string.default_home_screen_channel_name))
            .setDescription(context.getString(R.string.default_home_screen_channel_description))
            .setAppLinkIntentUri(Uri.parse(DEFAULT_CHANNEL_LINK))
            .setInternalProviderId(DEFAULT_CHANNEL_ID)
            .setLogo(logo)
            .build()

        return previewChannelHelper.publishDefaultChannel(defaultChannel)
    }

    /**
     * Returns videos to include in the default channel
     *
     * This simply shuffles the full list of videos and returns any that aren't in the channel
     * already. [excludedIds] is a list of video IDs should shouldn't be added (e.g., those that
     * are already in it) and [countToAdd] controls the maximum amount to be returned.
     *
     * For your app, you'll likely want something more specific like the most popular content or
     * newest releases, but it's entirely up to you what makes the most sense to put in your channel.
     */
//    fun getVideosForDefaultChannel(
//        application: Application,
//        excludedIds: Set<String>,
//        countToAdd: Int
//    ): List<Video> {
//        val videoRepository = VideoRepositoryFactory.getVideoRepository(application)
//        return videoRepository.getAllVideos()
//            .shuffled() // Mix the videos to avoid getting all of one type
//            .filterNot { excludedIds.contains(it.id) } // Exclude videos already in the channel
//            .take(countToAdd) // Take only as many as needed to fill the channel
//    }

    /**
     * Adds the passed [videos] to the PreviewChannel with [channelId]
     */
    @SuppressLint("RestrictedApi")
    fun addProgramsToChannel(videos: List<WatchListSeries>, channelId: Long) {
        videos.forEach {
            addWatchListToChannel(it, channelId)
        }
    }

    /**
     * Adds the passed [episode] to the PreviewChannel with [channelId]
     */
    @SuppressLint("RestrictedApi")
    fun addWatchListToChannel(episode: WatchListSeries, channelId: Long) {
        val program = PreviewProgram.Builder()
            .setType(TvContractCompat.PreviewPrograms.TYPE_TV_EPISODE)
            .setChannelId(channelId)
            .setIntentUri(Uri.parse("naikamutv://naikamu.com"))
            .setPosterArtAspectRatio(TvContractCompat.PreviewPrograms.ASPECT_RATIO_4_3)
            .setPosterArtUri(Uri.parse(episode.posterUri))
            .setSeasonNumber(1)
            .setTitle(episode.title)
            .setInternalProviderId(episode.id)
            .build()

        previewChannelHelper.publishPreviewProgram(program)
    }

    /**
     * Returns the PreviewChannel used as the default if available
     */
    fun getDefaultChannel(): PreviewChannel? {
        return getChannelByInternalProviderId(DEFAULT_CHANNEL_ID)
    }

    /**
     * Returns a PreviewChannel with [internalProviderId] if available
     */
    fun getChannelByInternalProviderId(internalProviderId: String): PreviewChannel? {
        return previewChannelHelper.allChannels.find { internalProviderId == it.internalProviderId }
    }

    /**
     * Returns a [ProgramIdsInChannel] for the passed [channelId]
     */
    fun getProgramIdsInChannel(context: Context, channelId: Long): ProgramIdsInChannel {
        context.contentResolver.query(
            TvContractCompat.buildPreviewProgramsUriForChannel(channelId),
            null,
            null,
            null,
            null
        )?.use {
            return getProgramIdsFromCursor(it)
        }
        return ProgramIdsInChannel()
    }

    /**
     * Returns a [ProgramIdsInChannel] by iterating through the [cursor]
     *
     * The passed [cursor] is _not_ closed
     */
    @VisibleForTesting
    fun getProgramIdsFromCursor(cursor: Cursor): ProgramIdsInChannel {
        val programIdsInChannel = ProgramIdsInChannel()
        val idColumnIndex =
            cursor.getColumnIndex(TvContract.PreviewPrograms.COLUMN_INTERNAL_PROVIDER_ID)
        val browsableColumnIndex =
            cursor.getColumnIndex(TvContract.PreviewPrograms.COLUMN_BROWSABLE)

        while (cursor.moveToNext()) {
            // Add to the ID list
            programIdsInChannel.addProgramId(
                cursor.getString(idColumnIndex),
                cursor.getInt(browsableColumnIndex) == 1
            )
        }

        return programIdsInChannel
    }
}
